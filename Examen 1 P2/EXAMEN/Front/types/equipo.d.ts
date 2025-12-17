// Tipos para el sistema de Equipos y Jugadores

export interface Equipo {
    id?: number;
    nombre: string;
    Jugadors?: Jugador[];
}

export interface Jugador {
    id?: number;
    nombre: string;
    id_equipo: number;
    Equipo?: Equipo;
}
