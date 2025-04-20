// Animation states for the bunny sprite
export enum BunnyAnimationState {
  IDLE = 'idle',
  HOPPING = 'hopping',
  DELIVERING = 'delivering'
}

// Get the appropriate sprite frame based on the animation state and progress
export const getBunnySprite = (
  state: BunnyAnimationState,
  progress: number = 0
): string => {
  // In a real implementation, we'd have multiple sprite frames
  // For now, we'll return placeholder paths
  switch (state) {
    case BunnyAnimationState.IDLE:
      return '/assets/sprites/bunny-idle.png';
    case BunnyAnimationState.HOPPING:
      // Use progress to cycle through hop animation frames
      const hopFrame = Math.floor(progress * 4) % 4;
      return `/assets/sprites/bunny-hop-${hopFrame}.png`;
    case BunnyAnimationState.DELIVERING:
      // Use progress to cycle through delivery animation frames
      const deliveryFrame = Math.floor(progress * 3) % 3;
      return `/assets/sprites/bunny-delivery-${deliveryFrame}.png`;
    default:
      return '/assets/sprites/bunny-idle.png';
  }
};

// Calculate the animation state based on the bunny's journey progress
export const calculateAnimationState = (
  _completionPercentage: number,
  transitionProgress: number
): BunnyAnimationState => {
  // If we're more than 75% through the transition between cities,
  // show the delivery animation
  if (transitionProgress > 0.75 && transitionProgress < 0.95) {
    return BunnyAnimationState.DELIVERING;
  }
  
  // Otherwise show the hopping animation
  return BunnyAnimationState.HOPPING;
};