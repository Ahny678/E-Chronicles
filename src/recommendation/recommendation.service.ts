import { Injectable } from '@nestjs/common';
import {
  Attributes,
  AttributeSet,
  Match,
  UserWithPreferences,
} from './dtos/rec-interface';

@Injectable()
export class RecommendationService {
  private readonly threshold = 0.5;

  private getAttributeSet(prefs: Attributes): AttributeSet {
    return new Set([
      prefs.musicGenre,
      prefs.personality,
      prefs.religion,
      prefs.age,
      prefs.gender,
      prefs.creative,
    ]);
  }

  private jaccardIndex(setA: AttributeSet, setB: AttributeSet): number {
    const intersection = new Set([...setA].filter((x) => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
  }

  evaluateMatches(
    currentUser: UserWithPreferences,
    allUsers: UserWithPreferences[],
  ): Match[] {
    const matches: Match[] = [];

    const currentAttrs = this.getAttributeSet(currentUser.Attributes!);
    const currentPrefs = this.getAttributeSet(currentUser.Preferences!);

    for (const candidate of allUsers) {
      if (candidate.id === currentUser.id) continue;

      const candidateAttrs = this.getAttributeSet(candidate.Attributes!);
      const candidatePrefs = this.getAttributeSet(candidate.Preferences!);

      const forwardMatch = this.jaccardIndex(currentPrefs, candidateAttrs);
      const backwardMatch = this.jaccardIndex(candidatePrefs, currentAttrs);

      if (forwardMatch > this.threshold && backwardMatch > this.threshold) {
        const averageScore = (forwardMatch + backwardMatch) / 2;
        matches.push({ userId: candidate.id, score: averageScore });
      }
    }

    return matches.sort((a, b) => b.score - a.score).slice(0, 5);
  }
}
