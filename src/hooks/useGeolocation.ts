import { useState, useCallback } from "react";
import type { Coordenadas, UseGeolocationOptions, UseGeolocationReturn } from '../types'

const useGeolocation = (options: UseGeolocationOptions = {}): UseGeolocationReturn => {
  const { enableHighAccuracy = true, timeout = 10000, onSuccess, onError } = options;

  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<sting | null>(null);

  const capturarLocalizacao = useCallback(() => {
    if (!navigator.geolocation) {
      const msg = 'Seu navegador não suporta geolocalização';
      setErro(msg);
      onError?.(msg);
      console.log(msg);
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
  }, [enableHighAccuracy, timeout, onSuccess, onError]);

  return { coordenadas, carregando, erro, capturarLocalizacao };
};

export default useGeolocation;
