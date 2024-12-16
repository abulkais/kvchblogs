export default async function handler(req, res) {
    try {
      const response = await fetch('https://kvch.in:859'); // Replace with your API URL
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  }
  