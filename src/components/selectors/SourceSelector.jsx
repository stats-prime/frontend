import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';

function SourceSelector({ gameIdDB, farmTypeFilter, value, onChange }) {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!gameIdDB || !farmTypeFilter) {
            setSources([]);
            return;
        }
        
        setLoading(true);
        axiosClient
          .get(`/games/${gameIdDB}/farm-sources/?source_type=${farmTypeFilter}`)
          .then((res) => setSources(res.data))
          .catch((err) => console.error("Error fetching sources:", err))
          .finally(() => setLoading(false));
    }, [gameIdDB, farmTypeFilter]);

    return (
        <div>
            <label className="block font-medium mb-2">Fuente de farmeo:</label>
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={!farmTypeFilter || loading} // solo se desactiva mientras carga o no hay tipo
              className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <option value="">
                {loading
                  ? "Cargando fuentes..."
                  : sources.length > 0
                  ? "Selecciona una fuente"
                  : "No hay fuentes disponibles"}
              </option>
                
              {!loading &&
                sources.map((src) => (
                  <option key={src.id} value={src.id}>
                    {src.name}
                  </option>
                ))}
            </select>
        </div>
    );
}

export default SourceSelector;