interface Props {
    page: string
}

const AnyAdvice = ({ page }: Props) => {

    return (
        <div>
            <h6 className='text-center my-4'>Você ainda não criou nenhum {page}</h6>
        </div>
    )

}

export default AnyAdvice