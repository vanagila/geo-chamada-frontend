export interface Coordenadas {
  latitude: number;
  longitude: number;
}

export interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  persistLocation?: boolean; 
  onSuccess?: (coords: Coordenadas) => void;
  onError?: (error: string) => void;
}

export interface UseGeolocationReturn {
  coordenadas: Coordenadas | null;
  carregando: boolean;
  erro: string | null;
  hasLocation: boolean;
  capturarLocalizacao: () => void;
}
