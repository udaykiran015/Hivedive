## 🖥️ Frontend
Developed with a modern web framework, the frontend delivers a seamless and responsive interface to monitor and interact with sensor data. Designed for both engineers and admins, it provides dashboards, maintenance tools, and real-time alerts.

## ☁️ Cloud & IoT Core
Sensor data is transmitted from edge devices (ESP8266-based) to AWS IoT Core. We implemented device certificates and MQTT-based data publishing to ensure secure and reliable connectivity.

## 🔗 System Integration
Data flows from IoT Core → IoT Thing Rules → AWS Lambda → DynamoDB → API Gateway. The frontend consumes this data via APIs to display sensor readings, alert levels, and recommended actions.
