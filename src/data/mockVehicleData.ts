export interface CarSpec {
    id: string;
    name: string;
    class: 'Hypercar' | 'GT3' | 'LMP2';
    enginePlacement: 'Front' | 'Mid' | 'Rear';
    defaultCharacteristics: string[];
  }
  
  export interface TrackSpec {
    id: string;
    name: string;
    gripLevel: 'High' | 'Medium' | 'Low';
    bumpiness: 'High' | 'Medium' | 'Low';
    characteristic: string;
  }

  export interface ReportedSymptomOption {
    id: string;
    label: 'Oversteer' | 'Understeer' | 'Balanced';
  }
  
  export const MOCK_CARS: CarSpec[] = [
    {
      id: 'porsche-911-gt3',
      name: 'Porsche 911 GT3 R',
      class: 'GT3',
      enginePlacement: 'Rear',
      defaultCharacteristics: ['High rear traction', 'Light front end on turn-in', 'Sensitive to lift-off oversteer']
    },
    {
      id: 'ferrari-296-gt3',
      name: 'Ferrari 296 GT3',
      class: 'GT3',
      enginePlacement: 'Mid',
      defaultCharacteristics: ['Balanced weight distribution', 'Agile mid-corner rotaton', 'Stable braking']
    }
  ];
  
  export const MOCK_TRACKS: TrackSpec[] = [
    {
      id: 'le-mans',
      name: 'Circuit de la Sarthe (Le Mans)',
      gripLevel: 'Medium',
      bumpiness: 'Medium',
      characteristic: 'Long straights, high top-speed zones, heavy braking markers'
    },
    {
      id: 'spa-francorchamps',
      name: 'Spa-Francorchamps',
      gripLevel: 'High',
      bumpiness: 'Low',
      characteristic: 'High-speed compression turns (Eau Rouge), flowing sectors'
    }
  ];

  export const MOCK_REPORTED_SYMPTOMS: ReportedSymptomOption[] = [
    { id: 'oversteer', label: 'Oversteer' },
    { id: 'understeer', label: 'Understeer' },
    { id: 'balanced', label: 'Balanced' }
  ];
  