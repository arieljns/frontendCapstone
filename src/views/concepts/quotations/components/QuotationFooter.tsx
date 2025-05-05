export default function QuotationFooter() {
    return (
        <div>
            <footer className="bg-[#5E2EDD] text-white px-6 py-10">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                    {/* Company Info + Brands */}
                    <div>
                        <p className="font-semibold mb-2">
                            PT Mid Solusi Nusantara
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="font-medium">➤ talenta</span>
                            <span className="font-medium">➤ sleekr</span>
                            <span className="font-medium">^ jurnal</span>
                            <span className="font-medium">✔ klikpajak</span>
                        </div>
                    </div>

                    {/* Head Office */}
                    <div>
                        <p className="font-semibold mb-2">Head Office</p>
                        <p>
                            MidPlaza 2, 4<sup>th</sup> Fl.
                            <br />
                            Jl. Jend. Sudirman Kav. 10-11
                            <br />
                            Jakarta 10220, Indonesia
                            <br />
                            📞 (021) 570 4030
                        </p>
                    </div>

                    {/* Commercial Office */}
                    <div>
                        <p className="font-semibold mb-2">Commercial Office</p>
                        <p>
                            SOHO Capital 43<sup>rd</sup> Fl. Podomoro City
                            <br />
                            Jl. Letjen. S. Parman Kav. 28
                            <br />
                            Jakarta 11470, Indonesia
                            <br />
                            📞 (021) 5050 1500
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
