import Container from '@/components/shared/Container'
import SpaceSignBoard from '@/assets/svg/SpaceSignBoard'

const DataNotFound = () => {
    return (
        <Container className="h-full">
            <div className="h-full flex flex-col items-center justify-center">
                <SpaceSignBoard height={280} width={280} />
                <div className="mt-10 text-center">
                    <h3 className="mb-2">Data Not Found!</h3>
                    <p className="text-base">
                        Error when trying to reach server. please check your
                        connection!
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default DataNotFound
