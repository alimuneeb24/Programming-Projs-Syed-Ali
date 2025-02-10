import requests
import tkinter as tk
from datetime import datetime

#here we are defining a function to get the weather data
def get_weather(event=None):
    city_name = city_entry.get()
    api_key = "e38a4c3b2c9f5318a5422a7baed14851"
    base_url = "https://api.openweathermap.org/data/2.5/weather?"
    complete_url = f"{base_url}q={city_name}&APPID={api_key}&units=metric"

    response = requests.get(complete_url)
    data = response.json()

    if data["cod"] != "404":
        main = data.get("main", {})
        weather = data.get("weather", [{}])[0]
        wind = data.get("wind", {})
        clouds = data.get("clouds", {})
        sys = data.get("sys", {})
        visibility = data.get("visibility", "Not available")
        name = data.get("name", "Not available")
        coord = data.get("coord", {})

        sunrise_time = datetime.fromtimestamp(sys.get("sunrise", 0))
        sunset_time = datetime.fromtimestamp(sys.get("sunset", 0))
        sunrise_readable = sunrise_time.strftime('%H:%M:%S')
        sunset_readable = sunset_time.strftime('%H:%M:%S')

        weather_info = (
            f"Weather in {name}:\n"
            f"Coordinates: Latitude: {coord.get('lat', 'N/A')}\n"
            f"Coordinates: Longitude: {coord.get('lon', 'N/A')}\n"
            f"Temperature: {main.get('temp', 'N/A')}°C\n"
            f"Feels Like: {main.get('feels_like', 'N/A')}°C\n"
            f"Minimum Temp: {main.get('temp_min', 'N/A')}°C\n"
            f"Maximum Temp: {main.get('temp_max', 'N/A')}°C\n"
            f"Pressure: {main.get('pressure', 'N/A')} hPa\n"
            f"Humidity: {main.get('humidity', 'N/A')}%\n"
            f"Weather: {weather.get('main', 'N/A')} - {weather.get('description', 'N/A').capitalize()}\n"
            f"Wind Speed: {wind.get('speed', 'N/A')} m/s, Direction: {wind.get('deg', 'N/A')}°\n"
            f"Cloudiness: {clouds.get('all', 'N/A')}%\n"
            f"Visibility: {visibility} meters\n"
            f"Sunrise: {sunrise_readable}\n"
            f"Sunset: {sunset_readable}\n"
        )
        result_label.config(text=weather_info)
    else:
        result_label.config(text="City not found. Please check the city name.")

# GUI setup
root = tk.Tk()
root.title("Weather App")
root.geometry("400x500")

# Font settings
font_large = ("poppins", 20, "bold")
font_medium = ("poppins", 15, "normal")

# City input
city_entry = tk.Entry(root, font=font_large, justify='center')
city_entry.pack(pady=20)
city_entry.focus()

# Get Weather Button
get_weather_button = tk.Button(root, text="Get Weather", font=font_medium, command=get_weather)
get_weather_button.pack()

# Result Label
result_label = tk.Label(root, font=font_medium, justify='left', anchor='w')
result_label.pack(pady=20)

root.bind('<Return>', get_weather)
root.mainloop()
