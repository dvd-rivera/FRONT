import React, { useState, useEffect, useContext } from 'react'
import { Combobox } from '@headlessui/react'
import { UserRegisterData, address } from '../models/user.interface'
import { UserContext } from '../context/user.context'

const RegisterPage: React.FC = () => {
    const user = useContext(UserContext)
    const [formData, setFormData] = useState<UserRegisterData>({
        firstName: '',
        lastName: '',
        mail: '',
        allAddress: [{ type: '', name: '', region: '', commune: '', addressDetail: '' }],
        password: '',
        phone: 0,
    })

    const [regionsData, setRegionsData] = useState<{ region: string; comunas: string[] }[]>([])
    const [regions, setRegions] = useState<string[]>([])
    const [filteredRegions, setFilteredRegions] = useState<string[]>([])
    const [filteredCommunes, setFilteredCommunes] = useState<string[]>([])

    useEffect(() => {
        fetch('/regiones.json')
            .then((response) => response.json())
            .then((data) => {
                setRegionsData(data.regiones)
                setRegions(data.regiones.map((item: { region: string }) => item.region))
                setFilteredRegions(data.regiones.map((item: { region: string }) => item.region))
            })
            .catch((error) => {
                console.error('Error al cargar las regiones:', error)
            })
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: name === 'phone' ? parseInt(value) : value,
        })
    }

    const handleAddressChange = (index: number, field: keyof address, value: string) => {
        const updatedAddresses = [...formData.allAddress]
        updatedAddresses[index] = {
            ...updatedAddresses[index],
            [field]: value,
        }

        updatedAddresses[index].name = `${updatedAddresses[index].region || ''}, ${
            updatedAddresses[index].commune || ''
        }, ${updatedAddresses[index].addressDetail || ''}`.trim()

        if (field === 'region') {
            const selectedRegion = regionsData.find((item) => item.region === value)
            setFilteredCommunes(selectedRegion ? selectedRegion.comunas : [])
            updatedAddresses[index].commune = '' // Reinicia la comuna
        }

        setFormData({ ...formData, allAddress: updatedAddresses })
    }

    const handleRegionFilter = (query: string) => {
        setFilteredRegions(
            query === ''
                ? regions
                : regions.filter((region) => region.toLowerCase().includes(query.toLowerCase()))
        )
    }

    const handleCommuneFilter = (query: string) => {
        const selectedRegion = regionsData.find(
            (item) => item.region === formData.allAddress[0]?.region
        )
        const communes = selectedRegion ? selectedRegion.comunas : []
        setFilteredCommunes(
            query === ''
                ? communes
                : communes.filter((commune) => commune.toLowerCase().includes(query.toLowerCase()))
        )
    }

    const addAddress = () => {
        setFormData({
            ...formData,
            allAddress: [
                ...formData.allAddress,
                { type: '', name: '', region: '', commune: '', addressDetail: '' },
            ],
        })
    }

    const removeAddress = (index: number) => {
        if (formData.allAddress.length > 1) {
            const updatedAddresses = formData.allAddress.filter((_, i) => i !== index)
            setFormData({ ...formData, allAddress: updatedAddresses })
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        user?.register(formData)
        // Aquí puedes enviar los datos al backend
    }

    return (
        <div className="flex items-center justify-center login-section">
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    Registro de Usuario
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Datos personales */}
                    <div className="mb-12">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Datos Personales
                        </h3>
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Ingresa tu nombre"
                                    required
                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 shadow-sm"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Ingresa tu apellido"
                                    required
                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    name="mail"
                                    value={formData.mail}
                                    onChange={handleInputChange}
                                    placeholder="Ingresa tu correo"
                                    required
                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 shadow-sm"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Teléfono
                                </label>
                                <input
                                    type="number"
                                    name="phone"
                                    value={formData.phone || ''}
                                    onChange={handleInputChange}
                                    placeholder="Ingresa tu teléfono"
                                    required
                                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Direcciones */}
                    <div className="mb-12">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Direcciones</h3>
                        {formData.allAddress.map((address, index) => (
                            <div key={index} className="mb-4 border-b border-gray-300 pb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-medium text-gray-700">
                                        Dirección {index + 1}
                                    </h4>
                                    {formData.allAddress.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAddress(index)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                                {/* Región */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Región
                                    </label>
                                    <Combobox
                                        value={address.region}
                                        onChange={(value: string) =>
                                            handleAddressChange(index, 'region', value)
                                        }
                                    >
                                        <div className="relative">
                                            <Combobox.Input
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => handleRegionFilter(e.target.value)}
                                                placeholder="Selecciona una región"
                                                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 shadow-sm"
                                            />
                                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                                                {filteredRegions.map((region) => (
                                                    <Combobox.Option
                                                        key={region}
                                                        value={region}
                                                        className="cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-500 hover:text-white"
                                                    >
                                                        {region}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        </div>
                                    </Combobox>
                                </div>
                                {/* Comuna */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Comuna
                                    </label>
                                    <Combobox
                                        value={address.commune}
                                        onChange={(value: string) =>
                                            handleAddressChange(index, 'commune', value)
                                        }
                                    >
                                        <div className="relative">
                                            <Combobox.Input
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => handleCommuneFilter(e.target.value)}
                                                placeholder="Selecciona una comuna"
                                                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 shadow-sm"
                                            />
                                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                                                {filteredCommunes.map((commune) => (
                                                    <Combobox.Option
                                                        key={commune}
                                                        value={commune}
                                                        className="cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-500 hover:text-white"
                                                    >
                                                        {commune}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        </div>
                                    </Combobox>
                                </div>
                                {/* Detalle de Dirección */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Detalle de la Dirección
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ingresa tu dirección"
                                        value={address.addressDetail}
                                        onChange={(e) =>
                                            handleAddressChange(
                                                index,
                                                'addressDetail',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 shadow-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tipo de domicilio
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Casa / Depto / trabajo"
                                        value={address.type}
                                        onChange={(e) =>
                                            handleAddressChange(index, 'type', e.target.value)
                                        }
                                        className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 shadow-sm"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addAddress}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Agregar Nueva Dirección
                        </button>
                    </div>

                    {/* Contraseña */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Contraseña</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password || ''}
                                onChange={handleInputChange}
                                placeholder="Ingresa tu contraseña"
                                required
                                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Botón de registro */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
