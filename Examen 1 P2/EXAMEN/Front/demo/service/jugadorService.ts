import { Jugador } from '../../types/equipo';

const API_BASE_URL = 'http://localhost:3000/api';

export const jugadorService = {
    async getJugadores(): Promise<Jugador[]> {
        const res = await fetch(`${API_BASE_URL}/jugadores`);
        if (!res.ok) throw new Error('Error al obtener jugadores');
        return res.json();
    },

    async getJugadorById(id: number): Promise<Jugador> {
        const res = await fetch(`${API_BASE_URL}/jugadores/${id}`);
        if (!res.ok) throw new Error('Error al obtener jugador');
        return res.json();
    },

    async getJugadoresByEquipo(equipoId: number): Promise<Jugador[]> {
        const res = await fetch(`${API_BASE_URL}/jugadores/equipo/${equipoId}`);
        if (!res.ok) throw new Error('Error al obtener jugadores del equipo');
        return res.json();
    },

    async createJugador(jugador: Jugador): Promise<Jugador> {
        const res = await fetch(`${API_BASE_URL}/jugadores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jugador)
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Error al crear jugador');
        }
        return res.json();
    },

    async updateJugador(id: number, jugador: Jugador): Promise<Jugador> {
        const res = await fetch(`${API_BASE_URL}/jugadores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jugador)
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Error al actualizar jugador');
        }
        return res.json();
    },

    async deleteJugador(id: number): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/jugadores/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Error al eliminar jugador');
        }
    }
};
