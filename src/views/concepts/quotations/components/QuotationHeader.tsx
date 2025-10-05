import './quotationHeader.css'
import QuotationFooter from './QuotationFooter'
import { useParams } from 'react-router-dom'
import { useProjectListStore } from '../../projects/ProjectList/store/projectListStore'

export default function QuotationHeader() {
    const { id } = useParams<{ id: string }>()
    // console.log(typeof id)

    const { projectList } = useProjectListStore()

    // console.log('This is the project list:', projectList)

    const quotationData = id
        ? projectList.find((project) => String(project.id) === id)
        : []

    console.log(quotationData)
    return (
        <div
            id="quotation-print"
            className="flex flex-col justify-between w-[210mm] min-h-[297mm] mx-auto pt-[10mm] pl-[10mm] pr-[10mm] mb-14 text-black text-sm font-sans bg-white print-page"
        >
            {/* Top Content Block */}
            <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <img
                        src="/img/logo mekari.png"
                        alt="Mekari Logo"
                        className="w-auto h-12"
                    />
                    <h3 className="text-lg font-bold">QUOTATION</h3>
                </div>

                {/* Quotation Details */}
                <div className="grid grid-cols-3 gap-4 text-xs mb-6">
                    <div>
                        <p className="font-semibold">Sales Name / Email</p>
                        <p>Gabriella Faustina</p>
                    </div>
                    <div>
                        <p className="font-semibold">Quotation No.</p>
                        <p>2401/SQ/MSN/{id}/2024</p>
                    </div>
                    <div>
                        <p className="font-semibold">Expiry Date</p>
                        <p>23 Desember 2025</p>
                    </div>
                </div>

                {/* Quotation Table */}
                <table className="w-full border border-gray-400 text-sm mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 p-2 text-left">
                                Paket
                            </th>
                            <th className="border border-gray-400 p-2 text-left">
                                Durasi
                            </th>
                            <th className="border border-gray-400 p-2 text-left">
                                Harga/Bulan
                            </th>
                            <th className="border border-gray-400 p-2 text-left">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 p-2">
                                PLUS FLAT - Basic
                            </td>
                            <td className="border border-gray-400 p-2">
                                12 Bulan
                            </td>
                            <td className="border border-gray-400 p-2">
                                Rp 2.500.000
                            </td>
                            <td className="border border-gray-400 p-2">
                                Rp 30.000.000
                            </td>
                        </tr>
                        <tr className=" font-semibold">
                            <td
                                colSpan={3}
                                className="border border-gray-400 p-2"
                            >
                                Diskon
                            </td>
                            <td className="border border-gray-400 p-2">28%</td>
                        </tr>
                        <tr>
                            <td
                                colSpan={3}
                                className="border border-gray-400 p-2"
                            >
                                Total setelah diskon
                            </td>
                            <td className="border border-gray-400 bg-[#512da8] text-white p-2">
                                Rp 21.600.000
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Company Info Grid */}
                <div className="grid grid-cols-2 border divide-x divide-y border-black mb-6">
                    <div className="p-3 text-gray-900">COMPANY NAME</div>
                    <div className="p-3 text-gray-900">TAX NUMBER</div>
                    <div className="p-3 font-bold">{quotationData.name}</div>
                    <div className="p-3"></div>

                    <div className="p-3 text-gray-900">MAILING ADDRESS</div>
                    <div className="p-3 text-gray-900">TAX ADDRESS</div>
                    <div className="p-3 h-20"></div>
                    <div className="p-3 h-20"></div>

                    <div className="p-3 text-gray-900 italic">
                        MAILING PIC / EMAIL / CONTACT
                    </div>
                    <div className="p-3 text-gray-900">
                        FINANCE PIC / EMAIL / CONTACT
                    </div>
                    <div className="p-3 font-bold">
                        Grace Agnesia / agnesia@bsstec.com / 085207734731
                    </div>
                    <div className="p-3"></div>

                    <div className="p-3 text-gray-900">PIC NAME</div>
                    <div className="p-3 text-gray-900">PIC POSITION</div>
                    <div className="p-3 font-bold">
                        {' '}
                        {quotationData.picName}
                    </div>
                    <div className="p-3 font-bold">
                        {quotationData.picRole[0]}
                    </div>

                    <div className="p-3 text-gray-900">
                        DIRECTOR / SIGNEE NAME
                    </div>
                    <div className="p-3 text-gray-900">
                        DIRECTOR / SIGNEE POSITION
                    </div>
                    <div className="p-3"></div>
                    <div className="p-3"></div>

                    <div className="p-3 text-gray-900">
                        DIRECTOR / SIGNEE EMAIL
                    </div>
                    <div className="p-3 text-gray-900">SUPER ADMIN EMAIL</div>
                    <div className="p-3"></div>
                    <div className="p-3"></div>
                </div>

                {/* Consent */}
                <div className="pt-4 text-gray-600 italic">
                    UNDER THE CONSENT OF,
                    <div className="flex justify-between pt-10">
                        <div className="border-t border-gray-400 w-64 text-center pt-2">
                            SIGNEE NAME
                        </div>
                        <div className="border-t border-gray-400 w-64 text-center pt-2">
                            COMPANY STAMP
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Component Stays at the Bottom */}
            <div className="mt-auto pt-8">
                <QuotationFooter />
            </div>
        </div>
    )
}
