import { useEffect, useState } from 'react';
import { useGifs } from './useGifs';
import { getSingleGif } from '@/services/getSingleGif';

export const useSingleGif = ({ id }) => {
	const { gifs } = useGifs();
	const gifFromCache = gifs.find((singleGif) => singleGif.id === id);

	const [gif, setGif] = useState(gifFromCache);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		//para ver si el spinner se esta renderizando o no
		//setIsLoading(true);

		if (!gif) {
			setIsLoading(true);
			//llamar al servicio si no tenemos gif
			getSingleGif({ id })
				.then((gif) => {
					setGif(gif);
					setIsLoading(false);
					setIsError(false);
				})
				.catch((err) => {
					setIsLoading(false);
					setIsError(true);
				});
		}
	}, [gif, id]);

	return { gif, isLoading, isError };
};
