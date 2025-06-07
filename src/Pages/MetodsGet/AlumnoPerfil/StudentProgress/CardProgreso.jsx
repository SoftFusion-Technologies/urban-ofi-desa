import React, { useState, useEffect } from 'react';

function ProgresoCard({ progreso }) {
  const fechaFormateada = new Date(progreso.fecha).toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // Parseamos valores que vienen como strings numéricos
  const peso = parseFloat(progreso.peso);
  const altura = parseFloat(progreso.altura);
  const grasa = parseFloat(progreso.grasa);
  const cintura = parseFloat(progreso.cintura);

  return (
    <div className="min-w-[200px] border border-blue-400 rounded-lg p-4 bg-blue-50 shadow-sm flex-shrink-0">
      <p className="font-semibold text-blue-700 mb-3">{fechaFormateada}</p>
      <p>
        <span className="font-semibold">Peso:</span> {peso.toFixed(1)} kg
      </p>
      <p>
        <span className="font-semibold">Altura:</span> {altura.toFixed(1)} cm
      </p>
      <p>
        <span className="font-semibold">Grasa corporal:</span> {grasa.toFixed(2)} %
      </p>
      <p>
        <span className="font-semibold">Cintura:</span> {cintura.toFixed(1)} cm
      </p>
      {progreso.comentario && (
        <p className="italic text-gray-600 mt-2">{progreso.comentario}</p>
      )}
    </div>
  );
}

export default function CardProgreso({ studentId }) {
  const [progresoData, setProgresoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchProgreso = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:8080/students/${studentId}/progress-comparison`
        );
        if (!res.ok) throw new Error('Error al cargar progreso');
        const data = await res.json();
        setProgresoData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgreso();
  }, [studentId]);

  if (loading) return <p>Cargando progreso...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (
    !progresoData ||
    !progresoData.comparison ||
    progresoData.comparison.length === 0
  ) {
    return <p>No hay progreso para mostrar.</p>;
  }

  // Usamos el primer elemento comparison (puede cambiarse si quieres mostrar otro)
  const {
    progresosDelMes = [],
    totalProgresosEnMes,
    diferenciaPeso,
    cumplioObjetivoPeso,
    pesoRestanteParaObjetivo,
    objetivo,
    estadoObjetivo,
    mes,
    anio,
  } = progresoData.comparison[0];

  if (progresosDelMes.length === 0)
    return <p>No hay progresos para mostrar.</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-blue-700/30">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4 border-b border-blue-700/40 pb-2">
        Progresos del mes {mes}/{anio} - Objetivo: {objetivo} ({estadoObjetivo})
      </h2>

      {/* Contenedor horizontal con scroll para los progresos */}
      <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-2">
        {progresosDelMes.map((prog, i) => (
          <ProgresoCard key={i} progreso={prog} />
        ))}
      </div>

      <hr className="my-6 border-blue-700/30" />

      {/* Resumen mensual */}
      <div className="space-y-3 text-gray-800 text-sm">
        <p>
          <span className="font-semibold text-blue-700">
            Total progresos en el mes:
          </span>{' '}
          {totalProgresosEnMes}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Diferencia de peso:</span>{' '}
          <span
            className={
              diferenciaPeso > 0
                ? 'text-green-600'
                : diferenciaPeso < 0
                ? 'text-red-600'
                : 'text-gray-700'
            }
          >
            {diferenciaPeso > 0 ? '+' : ''}
            {diferenciaPeso} kg
          </span>
        </p>
        <p>
          <span className="font-semibold text-blue-700">Cumplió objetivo peso:</span>{' '}
          {cumplioObjetivoPeso ? 'Sí' : 'No'}
        </p>
        <p>
          <span className="font-semibold text-blue-700">
            Peso restante para objetivo:
          </span>{' '}
          {pesoRestanteParaObjetivo} kg
        </p>
      </div>
    </div>
  );
}
