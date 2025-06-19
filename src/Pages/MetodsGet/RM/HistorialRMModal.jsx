import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function HistorialRMModal({
  isOpen,
  onClose,
  historial,
  ejercicio
}) {
    const datos = historial.map((r) => ({
      fecha: new Date(r.fecha).toLocaleDateString('es-AR'),
      rm:
        r.rm_estimada !== null
          ? parseFloat(r.rm_estimada)
          : Math.round(
              parseFloat(r.peso_levantado) *
                (1 + parseInt(r.repeticiones) / 30) *
                100
            ) / 100
    }));
      

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      <Dialog.Panel
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className="relative z-50 bg-white max-w-2xl w-full rounded-2xl shadow-xl p-6"
      >
        <Dialog.Title className="text-xl font-bold text-center text-gray-800 mb-4">
          Historial de RM – <span className="text-indigo-600">{ejercicio}</span>
        </Dialog.Title>

        {datos.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ddd'
                }}
                formatter={(value) => `${value} kg`}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="rm"
                name="RM Estimado"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No hay historial suficiente para este ejercicio.
          </p>
        )}

        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition"
          >
            Cerrar
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
