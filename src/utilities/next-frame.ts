const next_frame = (fn: FrameRequestCallback) => window.requestAnimationFrame(() => window.requestAnimationFrame(fn))

export default next_frame
