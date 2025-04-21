import { describe, it, expect } from 'vitest';
import {
  BunnyAnimationState,
  calculateAnimationState,
  getBunnySprite
} from '../../utils/animationUtils';

describe('animationUtils', () => {
  describe('BunnyAnimationState enum', () => {
    it('has all required animation states', () => {
      expect(BunnyAnimationState.IDLE).toBe('idle');
      expect(BunnyAnimationState.HOPPING).toBe('hopping');
      expect(BunnyAnimationState.DELIVERING).toBe('delivering');
    });
  });

  describe('calculateAnimationState', () => {
    it('returns DELIVERING when transition progress is between 0.75 and 0.95 exclusive', () => {
      // The actual code checks for transitionProgress > 0.75 && transitionProgress < 0.95
      expect(calculateAnimationState(50, 0.75 + 0.001)).toBe(BunnyAnimationState.DELIVERING);
      expect(calculateAnimationState(50, 0.8)).toBe(BunnyAnimationState.DELIVERING);
      expect(calculateAnimationState(50, 0.94)).toBe(BunnyAnimationState.DELIVERING);
    });

    it('returns HOPPING when transition progress is <= 0.75', () => {
      expect(calculateAnimationState(50, 0)).toBe(BunnyAnimationState.HOPPING);
      expect(calculateAnimationState(50, 0.5)).toBe(BunnyAnimationState.HOPPING);
      expect(calculateAnimationState(50, 0.75 - 0.0001)).toBe(BunnyAnimationState.HOPPING);
    });

    it('returns HOPPING when transition progress is >= 0.95', () => {
      expect(calculateAnimationState(50, 0.95)).toBe(BunnyAnimationState.HOPPING);
      expect(calculateAnimationState(50, 1)).toBe(BunnyAnimationState.HOPPING);
    });

    it('ignores completion percentage parameter (underscore prefix)', () => {
      // Should return the same result regardless of completion percentage
      expect(calculateAnimationState(0, 0.8)).toBe(BunnyAnimationState.DELIVERING);
      expect(calculateAnimationState(50, 0.8)).toBe(BunnyAnimationState.DELIVERING);
      expect(calculateAnimationState(100, 0.8)).toBe(BunnyAnimationState.DELIVERING);
    });
  });

  describe('getBunnySprite', () => {
    it('returns correct sprite for IDLE state', () => {
      expect(getBunnySprite(BunnyAnimationState.IDLE)).toBe('/assets/sprites/bunny-idle.png');
      // Progress parameter shouldn't affect idle sprite
      expect(getBunnySprite(BunnyAnimationState.IDLE, 0.5)).toBe('/assets/sprites/bunny-idle.png');
    });

    it('returns correct sprite for HOPPING state with progress', () => {
      expect(getBunnySprite(BunnyAnimationState.HOPPING, 0)).toBe('/assets/sprites/bunny-hop-0.png');
      expect(getBunnySprite(BunnyAnimationState.HOPPING, 0.24)).toBe('/assets/sprites/bunny-hop-0.png');
      expect(getBunnySprite(BunnyAnimationState.HOPPING, 0.25)).toBe('/assets/sprites/bunny-hop-1.png');
      expect(getBunnySprite(BunnyAnimationState.HOPPING, 0.5)).toBe('/assets/sprites/bunny-hop-2.png');
      expect(getBunnySprite(BunnyAnimationState.HOPPING, 0.75)).toBe('/assets/sprites/bunny-hop-3.png');
      expect(getBunnySprite(BunnyAnimationState.HOPPING, 0.99)).toBe('/assets/sprites/bunny-hop-3.png');
      // Should cycle back to first frame
      expect(getBunnySprite(BunnyAnimationState.HOPPING, 1.0)).toBe('/assets/sprites/bunny-hop-0.png');
    });

    it('returns correct sprite for DELIVERING state with progress', () => {
      expect(getBunnySprite(BunnyAnimationState.DELIVERING, 0)).toBe('/assets/sprites/bunny-delivery-0.png');
      expect(getBunnySprite(BunnyAnimationState.DELIVERING, 0.33)).toBe('/assets/sprites/bunny-delivery-0.png');
      expect(getBunnySprite(BunnyAnimationState.DELIVERING, 0.34)).toBe('/assets/sprites/bunny-delivery-1.png');
      expect(getBunnySprite(BunnyAnimationState.DELIVERING, 0.66)).toBe('/assets/sprites/bunny-delivery-1.png');
      expect(getBunnySprite(BunnyAnimationState.DELIVERING, 0.67)).toBe('/assets/sprites/bunny-delivery-2.png');
      expect(getBunnySprite(BunnyAnimationState.DELIVERING, 0.99)).toBe('/assets/sprites/bunny-delivery-2.png');
    });

    it('uses default progress value when not provided', () => {
      expect(getBunnySprite(BunnyAnimationState.HOPPING)).toBe('/assets/sprites/bunny-hop-0.png');
    });

    it('defaults to idle sprite for invalid animation state', () => {
      // @ts-expect-error - Testing invalid state
      expect(getBunnySprite('invalid_state')).toBe('/assets/sprites/bunny-idle.png');
    });
  });
});