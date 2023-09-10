interface AnyAdviceProps {
    page: string
}

const AnyAdvice = ({ page }: AnyAdviceProps) => {

    return (
        <div>
            <h6 className='text-center mt-2 mb-4'>Você ainda não criou nenhum(a) {page}</h6>
        </div>
    )

}

export default AnyAdvice