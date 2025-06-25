import { Injectable } from '@nestjs/common';
import { Attributes, Match, UserWithPreferences } from './dtos/rec-interface';

@Injectable()
export class RecommendationService {
  private readonly threshold = 0.4;

  private computeSimilarityScore(a: Attributes, b: Attributes): number {
    let score = 0;
    const total = 6;

    if (a.musicGenre === b.musicGenre) score++;
    if (a.personality === b.personality) score++;
    if (a.religion === b.religion) score++;
    if (a.age === b.age) score++;
    if (a.gender === b.gender) score++;
    if (a.creative === b.creative) score++;

    return score / total;
  }

  evaluateMatches(
    currentUser: UserWithPreferences,
    allUsers: UserWithPreferences[],
  ): Match[] {
    const matches: Match[] = [];

    if (!currentUser.Attributes || !currentUser.Preferences) {
      console.warn(`Current user ${currentUser.id} has incomplete data.`);
      return [];
    }

    for (const candidate of allUsers) {
      if (candidate.id === currentUser.id) continue;
      if (!candidate.Attributes || !candidate.Preferences) continue;

      const forwardMatch = this.computeSimilarityScore(
        currentUser.Preferences,
        candidate.Attributes,
      );

      const backwardMatch = this.computeSimilarityScore(
        candidate.Preferences,
        currentUser.Attributes,
      );

      const averageScore = (forwardMatch + backwardMatch) / 2;

      if (averageScore >= this.threshold) {
        matches.push({
          user: candidate,
          score: averageScore,
        });
      }
    }

    return matches.sort((a, b) => b.score - a.score).slice(0, 5);
  }

  //***********JACCARD INDEX APPROACH. NOT PTRACTICAL FOR THIS APPLICATION********** */

  // private jaccardIndex(setA: AttributeSet, setB: AttributeSet): number {
  //   const intersection = new Set([...setA].filter((x) => setB.has(x)));
  //   const union = new Set([...setA, ...setB]);
  //   return intersection.size / union.size;
  // }

  // evaluateMatches(
  //   currentUser: UserWithPreferences,
  //   allUsers: UserWithPreferences[],
  // ): Match[] {
  //   const matches: Match[] = [];

  //   if (!currentUser.Attributes || !currentUser.Preferences) {
  //     console.warn(`Current user ${currentUser.id} has incomplete data.`);
  //     return [];
  //   }

  //   const currentAttrs = this.getAttributeSet(currentUser.Attributes);
  //   const currentPrefs = this.getAttributeSet(currentUser.Preferences);

  //   for (const candidate of allUsers) {
  //     if (candidate.id === currentUser.id) continue;

  //     if (!candidate.Attributes || !candidate.Preferences) {
  //       console.warn(
  //         `Candidate ${candidate.id} has incomplete data. Skipping.`,
  //       );
  //       continue;
  //     }

  //     const candidateAttrs = this.getAttributeSet(candidate.Attributes);
  //     const candidatePrefs = this.getAttributeSet(candidate.Preferences);

  //     const forwardMatch = this.jaccardIndex(currentPrefs, candidateAttrs);
  //     const backwardMatch = this.jaccardIndex(candidatePrefs, currentAttrs);

  //     if (forwardMatch > this.threshold && backwardMatch > this.threshold) {
  //       const averageScore = (forwardMatch + backwardMatch) / 2;
  //       matches.push({ userId: candidate.id, score: averageScore });
  //     }
  //   }

  //   return matches.sort((a, b) => b.score - a.score).slice(0, 5);
  // }
  // private getAttributeSet(prefs: Attributes): AttributeSet {
  //   return new Set([
  //     prefs.musicGenre,
  //     prefs.personality,
  //     prefs.religion,
  //     prefs.age,
  //     prefs.gender,
  //     prefs.creative,
  //   ]);
  // }
}
