import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ParticlesBackground from '../../../../Components/ParticlesBackground';
import { useAuth } from '../../../../AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const StudentGoalModal = ({ studentId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [goal, setGoal] = useState('');
  const [alturaCm, setAlturaCm] = useState('');
  const [pesoKg, setPesoKg] = useState('');
  const [edad, setEdad] = useState('');
  const [grasaCorporal, setGrasaCorporal] = useState('');
  const [cinturaCm, setCinturaCm] = useState('');
  const [imc, setImc] = useState('');
  const [controlAntropometrico, setControlAntropometrico] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [step, setStep] = useState(1);

  const { nomyape } = useAuth();

  const URL = 'http://localhost:8080';

  useEffect(() => {
    if (pesoKg && alturaCm && edad) {
      const alturaEnMetros = alturaCm / 100;
      const imc = pesoKg / (alturaEnMetros * alturaEnMetros);
      setImc(imc.toFixed(2)); // si quieres mostrarlo también
      const grasa = (1.2 * imc + 0.23 * edad - 5.4).toFixed(2);
      setGrasaCorporal(grasa);
    }
  }, [pesoKg, alturaCm, edad]);

  useEffect(() => {
    if (!studentId) return;

    const fetchGoal = async () => {
      setLoading(true);
      try {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        console.log(month);

        console.log(month);
        const res = await axios.get(
          `${URL}/student-monthly-goals?student_id=${studentId}&mes=${month}&anio=${year}`
        );

        if (!res.data || res.data.length === 0) {
          setModalOpen(true);
        }
      } catch (error) {
        console.error('Error al consultar objetivo mensual:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim()) return alert('Por favor, ingrese un objetivo válido.');

    setSaving(true);
    try {
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      await axios.post(`${URL}/student-monthly-goals`, {
        student_id: studentId,
        objetivo: goal,
        mes: month,
        anio: year,
        altura_cm: alturaCm || null,
        peso_kg: pesoKg || null,
        edad: edad || null,
        control_antropometrico: controlAntropometrico || null,
        grasa_corporal: grasaCorporal || null,
        cintura_cm: cinturaCm || null
      });

      setModalOpen(false);
      setGoal('');
      alert('Objetivo guardado correctamente.');
    } catch (error) {
      console.error('Error al guardar objetivo mensual:', error);
      alert('Error al guardar el objetivo, intente nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  const calcularGrasaBasadaEnIMC = (imc) => {
    return (1.39 * imc).toFixed(2); // Estimación simple sin sexo ni edad
  };
  const mensajes = {
    1: '¡Hola {nomyape}! Empecemos por definir tu objetivo para este mes. ¿Qué te gustaría lograr?',
    2: '{nomyape}, contanos cuál es tu altura en centímetros para personalizar tu plan.',
    3: 'Perfecto, {nomyape}. Ahora ingresá tu peso actual en kilogramos.',
    4: 'Gracias, {nomyape}. ¿Cuál es tu edad?',
    5: '{nomyape}, ¿te gustaría realizar un control antropométrico? Esto nos ayuda a conocer mejor tu composición corporal.',
    6: 'Por último, {nomyape}, ingresá el valor de tu cintura en centímetros (opcional).',
    7: '¡Listo {nomyape}! Este es el resumen con toda la información que cargaste. ¡Gran trabajo!'
  };

  const primerNombre = nomyape.split(' ')[0];

  if (loading) return null;

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <ParticlesBackground />
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              aria-label="Cerrar modal"
            >
              ✖
            </button>

            <AnimatePresence mode="wait">
              <motion.h2
                key={step} // clave para que cambie con el paso
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="titulo text-xl  uppercase font-semibold mb-5 text-center text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: mensajes[step].replace(
                    '{nomyape}',
                    `<span class="text-blue-700">${primerNombre}</span>`
                  )
                }}
              />
            </AnimatePresence>

            <div className="max-w-xl mx-auto">
              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-blue-500 h-full transition-all duration-300"
                  style={{ width: `${(step / 6) * 100}%` }}
                />
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step === 1 && (
                      <div className="mb-4">
                        <label className="block mb-2 font-semibold">
                          Objetivo
                        </label>
                        <textarea
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          placeholder="Define un objetivo claro y alcanzable para este mes que ayudará a mantener el foco y medir tus avances. Por ejemplo: 'Perder 3 kilos', 'Correr 5 km tres veces por semana' o 'Mejorar mi alimentación.'"
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg p-4"
                          required
                        />
                      </div>
                    )}

                    {step === 2 && (
                      <div className="mb-4">
                        <input
                          type="number"
                          placeholder="Altura (cm)"
                          value={alturaCm}
                          onChange={(e) => setAlturaCm(Number(e.target.value))}
                          className="w-full border p-2 rounded"
                          required
                        />
                      </div>
                    )}

                    {step === 3 && (
                      <div className="mb-4">
                        <input
                          type="number"
                          placeholder="Peso (kg)"
                          value={pesoKg}
                          onChange={(e) => setPesoKg(Number(e.target.value))}
                          className="w-full border p-2 rounded"
                          required
                        />
                      </div>
                    )}

                    {step === 4 && (
                      <div className="mb-4">
                        <input
                          type="number"
                          placeholder="Edad"
                          value={edad}
                          onChange={(e) => setEdad(Number(e.target.value))}
                          className="w-full border p-2 rounded"
                          required
                        />
                      </div>
                    )}

                    {step === 5 && (
                      <div className="mb-4 space-y-2">
                        <label className="block text-sm font-medium">
                          ¿Control antropométrico?
                        </label>
                        <p className="text-sm text-gray-600">
                          El control antropométrico evalúa medidas corporales
                          como peso, altura, IMC y circunferencia de cintura
                          para conocer tu composición corporal.
                        </p>
                        <select
                          value={controlAntropometrico}
                          onChange={(e) =>
                            setControlAntropometrico(e.target.value)
                          }
                          className="w-full border p-2 rounded"
                        >
                          <option value="">Seleccionar</option>
                          <option value="SI">Sí</option>
                          <option value="NO">No</option>
                        </select>
                      </div>
                    )}

                    {step === 6 && (
                      <div className="mb-4 space-y-2">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Cintura (cm)"
                          value={cinturaCm}
                          onChange={(e) => setCinturaCm(e.target.value)}
                          className="w-full border p-2 rounded"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setCinturaCm(null);
                            setStep(7);
                          }}
                          className="w-full py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-semibold transition"
                        >
                          Omitir este paso
                        </button>
                      </div>
                    )}

                    {step === 7 && (
                      <div className="mb-4 space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Objetivo
                          </label>
                          <textarea
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            rows={2}
                            className="w-full border p-2 rounded"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Altura (cm)
                            </label>
                            <input
                              type="number"
                              value={alturaCm}
                              onChange={(e) =>
                                setAlturaCm(Number(e.target.value))
                              }
                              className="w-full border p-2 rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Peso (kg)
                            </label>
                            <input
                              type="number"
                              value={pesoKg}
                              onChange={(e) =>
                                setPesoKg(Number(e.target.value))
                              }
                              className="w-full border p-2 rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Edad
                            </label>
                            <input
                              type="number"
                              value={edad}
                              onChange={(e) => setEdad(Number(e.target.value))}
                              className="w-full border p-2 rounded"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Cintura (cm)
                            </label>
                            <input
                              type="number"
                              value={cinturaCm || ''}
                              onChange={(e) => setCinturaCm(e.target.value)}
                              className="w-full border p-2 rounded"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Control antropométrico
                          </label>
                          <select
                            value={controlAntropometrico}
                            onChange={(e) =>
                              setControlAntropometrico(e.target.value)
                            }
                            className="w-full border p-2 rounded"
                          >
                            <option value="">Seleccionar</option>
                            <option value="SI">Sí</option>
                            <option value="NO">No</option>
                          </select>
                        </div>

                        <div className="text-center mt-4">
                          <div className="text-lg font-medium">
                            Tu IMC es:{' '}
                            <span className="font-bold text-blue-700">
                              {imc}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Grasa corporal estimada:{' '}
                            <span className="font-semibold">
                              {grasaCorporal}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Botones de navegación */}
                    <div className="flex justify-between items-center gap-4 mt-6">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setStep((prev) => Math.max(prev - 1, 1))
                          }
                          className="w-full py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black font-semibold transition"
                        >
                          Anterior
                        </button>
                      )}

                      {step < 7 && (
                        <button
                          type="button"
                          onClick={() =>
                            setStep((prev) => Math.min(prev + 1, 7))
                          }
                          disabled={
                            (step === 1 && !goal.trim()) ||
                            (step === 2 && alturaCm <= 0) ||
                            (step === 3 && pesoKg <= 0) ||
                            (step === 4 && edad <= 0)
                          }
                          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
                            (step === 1 && !goal.trim()) ||
                            (step === 2 && alturaCm <= 0) ||
                            (step === 3 && pesoKg <= 0) ||
                            (step === 4 && edad <= 0)
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          Siguiente
                        </button>
                      )}

                      {step === 7 && (
                        <button
                          type="submit"
                          disabled={saving}
                          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                            saving
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {saving ? 'Guardando...' : 'Guardar Objetivo'}
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentGoalModal;
