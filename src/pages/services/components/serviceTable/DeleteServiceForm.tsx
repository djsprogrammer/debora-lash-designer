const DeleteServiceForm = () => {

	return (
		<div style={{ zIndex: 1 }} className='position-absolute vw-100 vh-100 top-0 start-0 d-flex justify-content-center align-items-center'>
			<div className='card p-5'>
				<p>Tem certeza que deseja excluir este serviço?</p>
				<div className='text-center'>
					<button className='btn btn-sm btn-outline-dark me-2'>Excluir</button>
					<button className='btn btn-sm btn-outline-danger'>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteServiceForm