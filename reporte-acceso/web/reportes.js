// web/reportes.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://192.168.1.8:3000/api/registros')  // ← CAMBIADO
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-registro');
            tbody.innerHTML = '';

            if (!data.length) {
                tbody.innerHTML = '<tr><td colspan="8">No hay registros disponibles.</td></tr>';
                return;
            }

            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.usuario_id}</td>
                    <td>${row.empresa_id}</td>
                    <td>${row.hora_entrada}</td>
                    <td>${row.hora_salida || '-'}</td>
                    <td>${row.ubicacion}</td>
                    <td>${row.resultado_autenticacion}</td>
                    <td>${row.foto_base64 ? `<img src="data:image/jpeg;base64,${row.foto_base64}"/>` : 'Sin imagen'}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            document.getElementById('tabla-registro').innerHTML = '<tr><td colspan="8">Error al cargar los datos</td></tr>';
            console.error('Error:', err);
        });
});
