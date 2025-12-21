import React, { useEffect, useRef } from 'react'

export default function StarfieldLayout({ children }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        const stars = []
        const numStars = 200
        const speed = 0.5

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width
            })
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = '#ffffff'

            for (let star of stars) {
                star.z -= speed
                if (star.z <= 0) {
                    star.z = width
                    star.x = Math.random() * width - width / 2
                    star.y = Math.random() * height - height / 2
                }

                const x = (star.x / star.z) * width / 2 + width / 2
                const y = (star.y / star.z) * height / 2 + height / 2
                const size = Math.max(0.5, (1 - star.z / width) * 3)

                if (x >= 0 && x <= width && y >= 0 && y <= height) {
                    ctx.beginPath()
                    ctx.arc(x, y, size, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
            requestAnimationFrame(animate)
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        window.addEventListener('resize', handleResize)
        const animationId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <div className="text-white min-h-screen font-sans relative">
            {children}
            <canvas
                ref={canvasRef}
                id="starfield"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #0c0c0c 100%)',
                    pointerEvents: 'none'
                }}
            />
        </div>
    )
}
