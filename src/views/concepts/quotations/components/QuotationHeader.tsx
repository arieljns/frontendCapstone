

export default function QuotationHeader() {
    return (
        <div>

            <div
                id="quotation-print"
                className="max-w-4xl mx-auto p-10 text-black text-sm font-sans"
            >
                <div className="flex justify-between items-center">
                    <img
                        src="../../../../../../public/img/logo mekari.png"
                        alt="Mekari Logo"
                        className="w-auto h-12"
                    />
                    <h3>QUOTATION</h3>
                </div>
                <table className="w-full border border-gray-400 text-xs mb-6">
                    <thead className="flex gap-6 items-start justify-between">
                        <tr className="bg-gray-100">
                            <th className="flex flex-col items-start ">
                                <p className="mb-2">Sales Name/ Email</p>
                                Gabriella Faustina
                            </th>
                        </tr>
                        <tr className="bg-gray-100">
                            <th className="flex flex-col items-start">
                                <p className="mb-2">Quotation No.</p>
                                <td>2401/SQ/MSN/01/2024</td>
                            </th>
                        </tr>
                        <tr className="bg-gray-100">
                            <th className="flex flex-col items-start">
                                <p className="mb-2">Expiry Date</p>
                                23 Desember 2025
                            </th>
                        </tr>
                    </thead>
                </table>
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
                        <tr className="bg-yellow-50 font-semibold">
                            <td
                                colSpan="3"
                                className="border border-gray-400 p-2"
                            >
                                Diskon
                            </td>
                            <td className="border border-gray-400 p-2">28%</td>
                        </tr>
                        <tr>
                            <td
                                colSpan="3"
                                className="border border-gray-400 p-2"
                            >
                                Total setelah diskon
                            </td>
                            <td className="border border-gray-400 p-2">
                                Rp 21.600.000
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="grid grid-cols-2 border divide-x divide-y divide-x border-black">
                    {/* Row 1 */}
                    <div className="p-3  text-gray-900">COMPANY NAME</div>
                    <div className="p-3  text-gray-900">TAX NUMBER</div>

                    <div className="p-3 col-span-1 font-bold">
                        PT. Batam Slop and Sludge Treatment Centre
                    </div>
                    <div className="p-3"></div>

                    {/* Row 2 */}
                    <div className="p-3 text-gray-900">MAILING ADDRESS</div>
                    <div className="p-3 text-gray-900">TAX ADDRESS</div>

                    <div className="p-3 h-20"></div>
                    <div className="p-3 h-20"></div>

                    {/* Row 3 */}
                    <div className="p-3 text-gray-900 italic">
                        MAILING PIC / EMAIL / CONTACT
                    </div>
                    <div className="p-3 text-gray-900">
                        FINANCE PIC / EMAIL / CONTACT
                    </div>

                    <div className="p-3">
                        Grace Agnesia / agnesia@bsstec.com / 085207734731
                    </div>
                    <div className="p-3"></div>

                    {/* Row 4 */}
                    <div className="p-3 text-gray-900">PIC NAME</div>
                    <div className="p-3 text-gray-900">PIC POSITION</div>

                    <div className="p-3">Grace Agnesia</div>
                    <div className="p-3"></div>

                    {/* Row 5 */}
                    <div className="p-3 text-gray-900">
                        DIRECTOR / SIGNEE NAME
                    </div>
                    <div className="p-3 text-gray-900">
                        DIRECTOR / SIGNEE POSITION
                    </div>

                    <div className="p-3"></div>
                    <div className="p-3"></div>

                    {/* Row 6 */}
                    <div className="p-3 text-gray-900">
                        DIRECTOR / SIGNEE EMAIL
                    </div>
                    <div className="p-3 text-gray-900">SUPER ADMIN EMAIL</div>

                    <div className="p-3"></div>
                    <div className="p-3"></div>
                </div>
                {/* Consent Section */}
                <div className="p-6 col-span-2">
                    <div className="italic text-gray-500">
                        UNDER THE CONSENT OF,
                    </div>
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
        </div>
    )
}
