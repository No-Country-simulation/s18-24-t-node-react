export function Title({title,description,hidden=false}){
    return(
        <div className="w-full m-5 px-5" hidden={hidden}>
            <h2 className="text-2xl font-medium">{title}</h2>
            <p className="text-color_text_second text-xl">
                {description}
            </p>
        </div>
    )
}