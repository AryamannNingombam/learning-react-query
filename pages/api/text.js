let text = 'this is the initial text'

const Text = (req, res, next) => {
  if (req.method === 'GET')
    return res.status(200).json({
      success: true,
      text,
    })
  if (req.method === 'POST') {
    text = req.body.text
    return res.status(200).json({
      success: true,
      text,
    })
  }
}

export default Text
