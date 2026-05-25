import { useState } from 'react'

function Modal({
    aberto,
    fechar,
    confirmar,
    titulo,
    mensagem,
    textoBotaoConfirmar = 'Confirmar',
    textoBotaoCancelar = 'Cancelar'
}) {

    if (!aberto) return null

    return (

        <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 px-4">

            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 animate-fadeIn">

                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {titulo}
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {mensagem}
                </p>

                <div className="flex justify-end gap-3">

                    {fechar && (
                        <button
                            onClick={fechar}
                            className="
                                px-4 py-2
                                rounded-xl
                                bg-gray-200
                                hover:bg-gray-300
                                transition
                                text-sm
                                font-medium
                            "
                        >
                            {textoBotaoCancelar}
                        </button>
                    )}

                    {confirmar && (
                        <button
                            onClick={confirmar}
                            className="
                                px-4 py-2
                                rounded-xl
                                bg-red-500
                                hover:bg-red-600
                                transition
                                text-white
                                text-sm
                                font-medium
                                shadow-lg
                            "
                        >
                            {textoBotaoConfirmar}
                        </button>
                    )}

                </div>

            </div>

        </div>
    )
}

export default Modal