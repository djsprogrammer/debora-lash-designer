interface Props {
    page: string
}

const Index = ({ page }: Props) => {

    return (
        <div>
            <h6 className='text-center my-4'>Você ainda não criou nenhum {page}</h6>
        </div>
    )

}

export default Index