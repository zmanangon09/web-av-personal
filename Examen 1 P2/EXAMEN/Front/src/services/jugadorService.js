import axios from 'axios';

const API_URL = 'http://localhost:3000/api/jugadores';

export const getJugadores = async () => {
    return await axios.get(API_URL);
};

export const getJugadorById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const getJugadoresByEquipo = async (equipoId) => {
    return await axios.get(`${API_URL}/equipo/${equipoId}`);
}

export const createJugador = async (jugador) => {
    return await axios.post(API_URL, jugador);
};

export const updateJugador = async (id, jugador) => {
    return await axios.put(`${API_URL}/${id}`, jugador);
};

export const deleteJugador = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
