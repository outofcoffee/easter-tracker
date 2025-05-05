import React, { useEffect, useRef, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTracker } from '../../hooks/useTracker';
import { getRandomFact, getFactForCountry } from '../../data/easterFacts';
import './delivery-bunny.css';

// Helper function to get the appropriate emoji for each item type
const getItemEmoji = (type: string): string => {
  switch (type) {
    case 'egg':
      return '🥚';
    case 'basket':
      return '🧺';
    case 'candy':
      return '🍬';
    default:
      return '🥚';
  }
};

// Helper function to get the appropriate font size for each item type
const getItemFontSize = (type: string): number => {
  switch (type) {
    case 'egg':
      return 16;
    case 'basket':
      return 20;
    case 'candy':
      return 15;
    default:
      return 16;
  }
};

// Helper function to get the appropriate border-radius for each item type
const getItemBorderRadius = (type: string): string => {
  switch (type) {
    case 'egg':
      return '50%';
    case 'basket':
      return '30%';
    case 'candy':
      return '45%';
    default:
      return '50%';
  }
};

// Interface for a delivery item
interface DeliveryItem {
  id: string;
  type: 'egg' | 'basket' | 'candy';
  angle: number;
  distance: number;
  color: string;
  size: number;
  createdAt: number;
  opacity: number;
  scale: number;
  rotation: number;
  shouldRemove: boolean;
}

// Main component
const DeliveryBunny: React.FC<{ position: [number, number] }> = ({ position }) => {
  const { currentPosition } = useTracker();
  const [fact, setFact] = useState(getRandomFact());
  const [isAtCity, setIsAtCity] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);
  
  // Store delivery items with complete lifecycle management
  const [deliveryItems, setDeliveryItems] = useState<DeliveryItem[]>([]);
  
  // Track last spawn time to avoid too frequent spawning
  const lastSpawnTimeRef = useRef(0);
  
  // Update state based on bunny's position
  useEffect(() => {
    if (currentPosition) {
      // Check if bunny is at a city
      const atCity = currentPosition.currentCity && 
                     currentPosition.nextCity && 
                     currentPosition.currentCity.id === currentPosition.nextCity.id;
      
      // Whether we should be showing delivery items
      const shouldDeliver = atCity || (currentPosition.overLand ?? true);
      
      setIsAtCity(!!atCity);
      setIsDelivering(!!shouldDeliver);
    }
  }, [currentPosition]);
  
  // Update fact when the bunny reaches a new city
  useEffect(() => {
    if (currentPosition?.currentCity) {
      const countryFact = getFactForCountry(currentPosition.currentCity.country);
      setFact(countryFact || getRandomFact());
    }
  }, [currentPosition?.currentCity?.id, currentPosition?.currentCity]);
  
  // Animation loop for items
  useEffect(() => {
    // Skip if not delivering
    if (!isDelivering) return;
    
    // Spawn new items occasionally
    const now = Date.now();
    const timeSinceLastSpawn = now - lastSpawnTimeRef.current;
    const spawnInterval = isAtCity ? 1800 : 3000; // Faster spawn rate based on location (was 2000/3500)
    
    if (timeSinceLastSpawn >= spawnInterval) {
      lastSpawnTimeRef.current = now;
      
      // Add new item(s)
      const numItemsToSpawn = isAtCity ? 
        Math.floor(Math.random() * 3) + 1 : // 1-3 items in cities
        1; // Always just 1 item over land
      
      const newItems: DeliveryItem[] = [];
      
      for (let i = 0; i < numItemsToSpawn; i++) {
        // Determine type based on location and randomness
        let type: DeliveryItem['type'];
        
        if (isAtCity) {
          // Cities get more varied items
          const itemTypeRoll = Math.random();
          if (itemTypeRoll > 0.65) {
            type = 'basket';
          } else if (itemTypeRoll > 0.35) {
            type = 'candy';
          } else {
            type = 'egg';
          }
        } else {
          // Over regular land - simpler distribution
          const itemTypeRoll = Math.random();
          if (itemTypeRoll > 0.8) {
            type = 'basket';
          } else if (itemTypeRoll > 0.5) {
            type = 'candy';
          } else {
            type = 'egg';
          }
        }
        
        // Calculate radial position
        const angle = Math.random() * Math.PI * 2;
        
        // Set size based on item type
        let size: number;
        switch (type) {
          case 'egg':
            size = 28;
            break;
          case 'basket':
            size = 36;
            break;
          case 'candy':
            size = 26;
            break;
          default:
            size = 28;
        }
        
        // Pick a color - different palettes for different items
        const colorPalettes = {
          egg: ['#FF9E80', '#FFCC80', '#FFE57F', '#CCFF90', '#80D8FF', '#CF93D9'],
          basket: ['#FFCC80', '#FFFDE7', '#F8BBD0', '#C5CAE9', '#B2DFDB'],
          candy: ['#F48FB1', '#EC407A', '#E91E63', '#D81B60', '#F06292']
        };
        
        // Use the right palette based on item type, or fallback to eggs
        const paletteKey = colorPalettes[type] ? type : 'egg';
        const colors = colorPalettes[paletteKey as keyof typeof colorPalettes];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Create new item
        newItems.push({
          id: `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          type,
          angle,
          distance: 30, // Start at bunny's edge
          color,
          size,
          createdAt: now,
          opacity: 0, // Start invisible
          scale: 0.7, // Start small
          rotation: Math.random() * 10 - 5,
          shouldRemove: false
        });
      }
      
      // Add new items to state
      setDeliveryItems(prev => [...prev, ...newItems]);
    }
    
    // Animation frame update all items
    const itemLifetime = 6000; // 6 seconds total lifetime (was 8 seconds)
    
    // Animation loop
    const animationFrame = requestAnimationFrame(() => {
      setDeliveryItems(prevItems => {
        if (prevItems.length === 0) return prevItems;
        
        return prevItems.map(item => {
          const itemAge = now - item.createdAt;
          
          // Phase 1: Appear/Pop (0-10% of lifetime)
          if (itemAge < itemLifetime * 0.1) {
            const progress = itemAge / (itemLifetime * 0.1);
            return {
              ...item,
              opacity: Math.min(0.95, progress * 0.95),
              scale: 0.7 + (progress * 0.4), // Grow to 1.1
            };
          }
          // Phase 2: Stable/Moving (10-70% of lifetime)
          else if (itemAge < itemLifetime * 0.7) {
            const progress = (itemAge - itemLifetime * 0.1) / (itemLifetime * 0.6);
            return {
              ...item,
              opacity: 0.95,
              scale: 1.1 - (progress * 0.15), // Shrink slightly to 0.95
              distance: 30 + (progress * 45), // Move outward faster and further
            };
          }
          // Phase 3: Fade Out (70-100% of lifetime)
          else if (itemAge < itemLifetime) {
            const progress = (itemAge - itemLifetime * 0.7) / (itemLifetime * 0.3);
            return {
              ...item,
              opacity: 0.95 * (1 - progress), // Fade to 0
              scale: 0.95 - (progress * 0.15), // Continue shrinking
              distance: 75 + (progress * 15), // Continue moving further
            };
          }
          // Ready for removal
          else {
            return {
              ...item,
              opacity: 0,
              shouldRemove: true
            };
          }
        }).filter(item => !item.shouldRemove); // Remove items marked for deletion
      });
    });
    
    // Cleanup animation frame
    return () => cancelAnimationFrame(animationFrame);
  }, [isDelivering, isAtCity, deliveryItems]);
  
  // Create custom bunny icon including delivery items
  const icon = L.divIcon({
    className: 'delivery-bunny-container',
    iconSize: [150, 150],
    iconAnchor: [75, 75],
    popupAnchor: [0, -75],
    html: `
      <div class="delivery-bunny-marker">
        ${deliveryItems.map(item => `
          <div class="delivery-item ${item.type}" style="
            position: absolute;
            left: 50%;
            top: 50%;
            width: ${item.size}px;
            height: ${item.size}px;
            background-color: ${item.color};
            border-radius: ${getItemBorderRadius(item.type)};
            border: 2px solid white;
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
            z-index: 99;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: ${item.opacity};
            transform: translate(-50%, -50%) 
                       rotate(${item.rotation}deg) 
                       translate(${Math.cos(item.angle) * item.distance}px, 
                                 ${Math.sin(item.angle) * item.distance}px) 
                       scale(${item.scale});
          ">
            <div style="font-size: ${getItemFontSize(item.type)}px; font-weight: bold;">
              ${getItemEmoji(item.type)}
            </div>
          </div>
        `).join('')}
        <div class="bunny-image">
          <img src="/assets/icons8-easter-bunny-100.png" alt="Easter Bunny" />
        </div>
      </div>
    `
  });
  
  return (
    <Marker position={position} icon={icon} zIndexOffset={1000}>
      <Popup className="bunny-popup">
        <div className="text-center">
          <h3 className="font-bold text-lg text-easter-pink">Easter Bunny</h3>
          {currentPosition?.currentCity && (
            <div>
              {isAtCity ? (
                <p>Delivering baskets in {currentPosition.currentCity.name}!</p>
              ) : (
                <p>
                  Traveling from {currentPosition.currentCity.name} to {currentPosition.nextCity?.name}
                </p>
              )}
            </div>
          )}
          <div className="mt-2 bg-easter-yellow p-2 rounded-lg">
            <p className="text-sm italic">{fact.text}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default DeliveryBunny;