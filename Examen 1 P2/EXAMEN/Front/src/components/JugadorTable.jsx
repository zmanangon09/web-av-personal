import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const JugadorTable = ({ jugadores, onEdit, onDelete }) => {

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" severity="warning" onClick={() => onEdit(rowData)} />
                <Button icon="pi pi-trash" severity="danger" onClick={() => onDelete(rowData.id)} />
            </div>
        );
    };

    const equipoBodyTemplate = (rowData) => {
        return rowData.Equipo ? rowData.Equipo.nombre : 'Sin Equipo';
    };

    return (
        <DataTable value={jugadores} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID" sortable style={{ width: '10%' }}></Column>
            <Column field="nombre" header="Nombre" sortable style={{ width: '40%' }}></Column>
            <Column body={equipoBodyTemplate} header="Equipo" sortable style={{ width: '30%' }}></Column>
            <Column body={actionBodyTemplate} header="Acciones" style={{ width: '20%' }}></Column>
        </DataTable>
    );
};

export default JugadorTable;
