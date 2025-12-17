import { Equipo } from '../../types/equipo';

const API_BASE_URL = 'http://localhost:3000/api';

export const equipoService = {
    async getEquipos(): Promise<Equipo[]> {
        const res = await fetch(`${API_BASE_URL}/equipos`);
        if (!res.ok) throw new Error('Error al obtener equipos');
        return res.json();
    },

    async getEquipoById(id: number): Promise<Equipo> {
        const res = await fetch(`${API_BASE_URL}/equipos/${id}`);
        if (!res.ok) throw new Error('Error al obtener equipo');
        return res.json();
    },

    async createEquipo(equipo: Equipo): Promise<Equipo> {
        const res = await fetch(`${API_BASE_URL}/equipos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(equipo)
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Error al crear equipo');
        }
        return res.json();
    },

    async updateEquipo(id: number, equipo: Equipo): Promise<Equipo> {
        const res = await fetch(`${API_BASE_URL}/equipos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(equipo)
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Error al actualizar equipo');
        }
        return res.json();
    },

    async deleteEquipo(id: number): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/equipos/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Error al eliminar equipo');
        }
    }
};
