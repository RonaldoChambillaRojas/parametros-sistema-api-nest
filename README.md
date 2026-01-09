## 💡 Ejemplos de Uso

### Listar todos los parámetros
```bash
curl -H "RUC: 20519883709" http://localhost:3001/api/parametros-sistema
```

**Respuesta:**
```json
[
  {
    "idParametroSistema": 1,
    "nombreParametroSistema": "URL_API_PRINCIPAL",
    "valorParametroSistema": "https://api.ejemplo.com/v1",
    "idGrupoParametro": 1,
    "idEntidadSistema": 1,
    "indicadorEstado": "A",
    "usuarioRegistro": "admin",
    "fechaRegistro": "2026-01-07T17:30:00.000Z",
    "usuarioModificacion": null,
    "fechaModificacion": null,
    "estadoSincronizacion": "0"
  }
]
```

### Obtener un parámetro por ID
```bash
curl -H "RUC: 20519883709" http://localhost:3001/api/parametros-sistema/1
```

### Crear un nuevo parámetro
```bash
curl -X POST http://localhost:3001/api/parametros-sistema \
  -H "RUC: 20519883709" \
  -H "Content-Type: application/json" \
  -d '{
    "nombreParametroSistema": "NUEVO_PARAMETRO",
    "valorParametroSistema": "valor_ejemplo",
    "idGrupoParametro": 1,
    "idEntidadSistema": 1,
    "indicadorEstado": "A",
    "usuarioRegistro": "admin"
  }'
```

### Actualizar un parámetro
```bash
curl -X PATCH http://localhost:3001/api/parametros-sistema/1 \
  -H "RUC: 20519883709" \
  -H "Content-Type: application/json" \
  -d '{
    "nombreParametroSistema": "URL_API_PRINCIPAL_ACTUALIZADA",
    "valorParametroSistema": "https://api-nueva.ejemplo.com/v2",
    "usuarioModificacion": "admin"
  }'
```

### Desactivar un parámetro (Soft Delete)
```bash
curl -X PATCH http://localhost:3001/api/parametros-sistema/1/disable \
  -H "RUC: 20519883709" \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioModificacion": "admin"
  }'
```

### Eliminar un parámetro (Hard Delete)
```bash
curl -X DELETE http://localhost:3001/api/parametros-sistema/1 \
  -H "RUC: 20519883709"
```