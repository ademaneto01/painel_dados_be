
interface props {
    params: {id:string}
}

export default function Product({params}: props) {

    return (
        <h1>Product: {params.id}</h1>
    )
}