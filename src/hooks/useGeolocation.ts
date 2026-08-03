import { useState, useCallback, useEffect } from "react";
import toast from 'react-hot-toast';
import type { Coordenadas, UseGeolocationOptions, UseGeolocationReturn } from '../types';

const LOCALIZACAO_STORAGE_KEY = '@GeoChamada/localizacao';

const useGeolocation = (options: UseGeolocationOptions = {}): UseGeolocationReturn => {
  const { 
    enableHighAccuracy = true, 
    timeout = 10000, 
    onSuccess, 
    onError,
    persistLocation = true
  } = options;

  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (persistLocation) {
      const salva = localStorage.getItem(LOCALIZACAO_STORAGE_KEY);
      if (salva) {
        try {
          const coords = JSON.parse(salva);
          console.log('Localização carregada do cache:', coords);
        } catch (e) {
          console.log('Erro ao carregar localizacão salva');
        }
      }
    }
  }, [persistLocation])

  const capturarLocalizacao = useCallback(() => {
    if (!navigator.geolocation) {
      const msg = 'Seu navegador não suporta geolocalização';
      setErro(msg);
      onError?.(msg);
      console.log(msg);
      toast.error(msg)
      return;
    }

    setCarregando(true);
    setErro(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoordenadas(coords);
        setCarregando(false);

        if (persistLocation) {
          localStorage.setItem(LOCALIZACAO_STORAGE_KEY, JSON.stringify(coords));
        }

        onSuccess?.(coords);
        console.log('Localização capturada com sucesso!');
      },
      (error) => {
        let mensagem = 'Erro ao obter localização';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            mensagem = 'Acesso à localização negado. Habilite nas configurações do navegador.';
            break;
          case error.POSITION_UNAVAILABLE:
            mensagem = 'Localização indisponível. Verifique o GPS.';
            break;
          case error.TIMEOUT:
            mensagem = 'Tempo limite excedido. Tente novamente.';
            break;
        }
        setErro(mensagem);
        setCarregando(false);
        onError?.(mensagem);
        console.log(mensagem);
      },
      { enableHighAccuracy, timeout }
    );
  }, [enableHighAccuracy, timeout, onSuccess, onError, persistLocation]);

  const hasLocation = coordenadas !== null;

  return { 
    coordenadas, 
    carregando, 
    erro, 
    capturarLocalizacao,
    hasLocation
  };
};

export default useGeolocation;
