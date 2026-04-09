# Predictive Asset Monitoring System

A real-time predictive maintenance platform that implements Autoencoder-based Anomaly Detection (APR) and Remaining Useful Life (RUL) prediction for industrial assets using machine learning.

## 🚀 Features

- **Real-time Anomaly Detection**: Uses autoencoder neural networks to detect anomalies in sensor data
- **RUL Prediction**: LSTM-based models to predict remaining useful life of assets
- **Live Dashboard**: Interactive web interface with real-time monitoring
- **Alert System**: Automated alerts for critical asset conditions
- **Health Monitoring**: Comprehensive health index calculation
- **Data Visualization**: Charts and graphs for predictive analytics
- **RESTful API**: FastAPI backend for seamless integration

## 🛠️ Tech Stack

### Backend
- **Python** - Core language
- **FastAPI** - High-performance web framework
- **TensorFlow/Keras** - Machine learning models
- **MongoDB** - NoSQL database
- **Pandas/Numpy** - Data processing
- **Scikit-learn** - Machine learning utilities

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Recharts** - Data visualization
- **Socket.io** - Real-time communication
- **Sass** - Styling
- **Axios** - HTTP client

### Infrastructure
- **Docker** - Containerization
- **Jupyter Notebook** - Data analysis and prototyping

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB
- Docker (optional)

## 🔧 Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Set up MongoDB connection in `app/config.py`

4. Run the FastAPI server:
```bash
uvicorn app.main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Using Docker (Recommended)

1. Ensure Docker and Docker Compose are installed

2. Configure the `docker-compose.yml` file with your services

3. Run the entire stack:
```bash
docker-compose up --build
```

## 📖 Usage

### API Endpoints

The API provides the following main endpoints:

- `POST /predict` - Get RUL predictions and anomaly scores
- `GET /assets` - Retrieve asset information
- `GET /alerts` - Get active alerts
- `GET /realtime` - Real-time data streaming
- `GET /dashboard` - Dashboard data

### Web Interface

Access the web dashboard at `http://localhost:5173` (default Vite port) to:

- View real-time asset health
- Monitor predictions and anomalies
- Manage alerts and maintenance schedules
- Analyze historical data

### Data Pipeline

1. **Data Ingestion**: Load sensor data from CSV files (FD004 dataset)
2. **Preprocessing**: Feature engineering and normalization
3. **Model Training**: Train APR and RUL models using Jupyter notebooks
4. **Prediction**: Real-time inference on new data
5. **Visualization**: Display results on the dashboard

## 📁 Project Structure

```
predictive-asset-monitoring/
├── backend/                    # Python FastAPI backend
│   ├── app/
│   │   ├── config.py          # Configuration settings
│   │   ├── main.py            # FastAPI application
│   │   ├── database/          # MongoDB connection and schemas
│   │   ├── models/            # ML models (APR, RUL)
│   │   ├── realtime/          # Real-time data streaming
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic
│   │   └── utils/             # Utilities (preprocessing, logging)
│   ├── requirements.txt       # Python dependencies
│   └── run.py                 # Application entry point
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Main application pages
│   │   ├── services/          # API and socket services
│   │   └── styles/            # SCSS stylesheets
│   ├── package.json           # Node dependencies
│   └── vite.config.js         # Vite configuration
├── data/                      # Dataset files
├── notebooks/                 # Jupyter notebooks for analysis
├── docs/                      # Documentation
├── docker-compose.yml         # Docker configuration
└── README.md                  # This file
```

## 🤖 Machine Learning Models

### APR (Anomaly Detection)
- **Architecture**: Autoencoder neural network
- **Purpose**: Detect anomalies in sensor readings
- **Training Data**: Normal operating conditions
- **Output**: Anomaly score (0-1)

### RUL (Remaining Useful Life)
- **Architecture**: LSTM neural network
- **Purpose**: Predict time until failure
- **Training Data**: Historical failure data
- **Output**: Predicted cycles until failure

## 📊 Data Sources

The system uses the NASA Turbofan Engine Degradation Simulation Dataset (FD004):
- Training data: `train_FD004.txt`
- Test data: `test_FD004.txt`
- RUL labels: `RUL_FD004.txt`

## 🔍 Development

### Running Tests
```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
cd frontend
npm test
```

### Code Quality
```bash
# Lint backend
cd backend
flake8

# Lint frontend
cd frontend
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support, please open an issue on GitHub.

## 🔄 Future Enhancements

- [ ] Multi-asset type support
- [ ] Advanced ML model ensemble
- [ ] Cloud deployment options
- [ ] Mobile application
- [ ] Integration with industrial IoT platforms
