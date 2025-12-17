import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const EquipoTable = ({ equipos, onEdit, onDelete }) => {

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" severity="warning" onClick={() => onEdit(rowData)} />
                <Button icon="pi pi-trash" severity="danger" onClick={() => onDelete(rowData.id)} />
            </div>
        );
    };

    return (
        <DataTable value={equipos} paginator rows={5} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID" sortable style={{ width: '10%' }}></Column>
            <Column field="nombre" header="Nombre" sortable style={{ width: '60%' }}></Column>
            <Column body={actionBodyTemplate} header="Acciones" style={{ width: '30%' }}></Column>
        </DataTable>
    );
};

export default EquipoTable;
