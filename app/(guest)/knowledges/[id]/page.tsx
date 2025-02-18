"use client"
import { useState, lazy } from "react"

import parse from "html-react-parser"

const Editor = lazy(() => import("@/app/components/Editor"))

import { Suspense } from "react"

export default function Knowledges() {
    test()
    // Fetch From DB
    const [content, setContent] = useState(`<h2>The Future of Technology: What's Next? 🚀</h2><p>Technology is evolving faster than ever. From <strong>artificial intelligence</strong> to <strong>quantum computing</strong>, we are witnessing groundbreaking innovations that are shaping the future.</p><p>&nbsp;</p><h3>🌟 Key Trends in Tech</h3><ol><li><strong>Artificial Intelligence (AI) &amp; Machine Learning</strong><br>AI is becoming more sophisticated, powering everything from chatbots to self-driving cars.</li><li><strong>Quantum Computing</strong><br>This technology has the potential to revolutionize problem-solving, making calculations exponentially faster.</li><li><strong>Blockchain &amp; Web3</strong><br>Decentralization is transforming the internet, offering more transparency and security.</li><li><strong>Augmented &amp; Virtual Reality (AR/VR)</strong><br>Immersive experiences are becoming mainstream, impacting gaming, education, and healthcare.</li></ol><h3>&nbsp;</h3><h3>🔥 What’s Next?</h3><p>As we move forward, <strong>ethical AI</strong>, <strong>sustainability in tech</strong>, and <strong>cybersecurity</strong> will be crucial discussions. The future is bright, and we are just getting started!</p><p>💡 <strong>What’s your favorite tech trend? Drop a comment below!</strong></p><p>&nbsp;</p>`)

    // Create button to enter EDITMODE, but prior authentication
    const [editmode, setEditMode] = useState<boolean>(false)

    return (
        <>
            <div className="flex flex-col w-screen gap-3 items-center">
                {editmode && <button
                    className="dark:bg-white/10 dark:hover:bg-theme-300/50 bg-black2/10 hover:bg-theme-500/40 py-3 px-6 rounded-xl cursor-pointer"
                    onClick={() => setEditMode(e => !e)}
                >Edit Mode</button>}
                <div className={`lg:w-[1000px] ${!editmode && "px-3"} ${editmode && "text-black2"} break-words`}>
                    {!editmode && parse(content)}
                    <Suspense fallback={<p>Loading...</p>}>
                        {editmode && <Editor content={content} updateContent={setContent} />}
                    </Suspense>
                </div>
            </div>
        </>
    )
}

async function test(){
    await new Promise((resolve) => setTimeout(resolve, 3000));
}