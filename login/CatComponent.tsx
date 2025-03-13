export default function CatComponent() {
    return (
        <div className="cat mt-5 drop-shadow-lg">
            <div className="cat-head">
                <div className="cat-ears">
                    <div></div>
                    <div></div>
                </div>
                <div className="cat-face">
                    <div className="cat-eyes">
                        <div></div>
                        <div></div>
                    </div>
                    <div className="cat-nose">
                        <div className="mustache">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="mustache">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <span className="mouth hide"></span>
                </div>
            </div>
            <div className="hand-wrap">
                <div className="hand">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )

}