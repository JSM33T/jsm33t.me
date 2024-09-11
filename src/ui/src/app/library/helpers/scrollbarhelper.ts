export function DefaultScrollbar()
{
    const sty = document.getElementById("scrollbar") as HTMLStyleElement;
    sty.innerHTML = "";

}

export function DisableScrollbar(){
    const sty = document.getElementById("scrollbar") as HTMLElement;
    sty.innerHTML= `
    body::-webkit-scrollbar {
				width: 0px;
			}

			*::-webkit-scrollbar {
				width: 0px;
			}

			*::-webkit-scrollbar-track {
				border-radius: 10px;
			}

			*::-webkit-scrollbar-thumb {
				height: 56px;
				border-radius: 8px;
				border: 10px solid transparent;
				background-clip: content-box;
				background-color: #808080;
			}

			*::-webkit-scrollbar-thumb:hover {
				background-color: #555;
			}
                `;
}

export function SkinnyScrollbar(){
    const sty = document.getElementById("scrollbar") as HTMLElement;
    sty.innerHTML= `
    body::-webkit-scrollbar {
				width: 08px;
			}

			*::-webkit-scrollbar {
				width: 08px;
			}

			*::-webkit-scrollbar-track {
				border-radius: 08px;
			}

			*::-webkit-scrollbar-thumb {
				height: 56px;
				border-radius: 8px;
				border: 08px solid transparent;
				background-clip: content-box;
				background-color: #808080;
			}

			*::-webkit-scrollbar-thumb:hover {
				background-color: #555;
			}
                `;
}