#!/usr/bin/env python3
"""
CYBER//BREACH: Cyberpunk Terminal Escape Room Server
A lightweight Python HTTP server with leaderboard persistence and static asset serving.
"""

import http.server
import socketserver
import json
import os
import sys
import urllib.parse
from datetime import datetime

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
LEADERBOARD_FILE = os.path.join(DIRECTORY, "leaderboard.json")

def load_leaderboard():
    if not os.path.exists(LEADERBOARD_FILE):
        initial_data = [
            {"callsign": "NEO_PHREAK", "time": "01:14.20", "seconds": 74.20, "date": "2099-10-01"},
            {"callsign": "ZERO_COOL", "time": "01:38.85", "seconds": 98.85, "date": "2099-10-03"},
            {"callsign": "GHOST_RUNNER", "time": "02:05.12", "seconds": 125.12, "date": "2099-10-05"},
            {"callsign": "ACID_BURN", "time": "02:42.30", "seconds": 162.30, "date": "2099-10-06"}
        ]
        with open(LEADERBOARD_FILE, "w", encoding="utf-8") as f:
            json.dump(initial_data, f, indent=2)
        return initial_data
    try:
        with open(LEADERBOARD_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_leaderboard(data):
    try:
        with open(LEADERBOARD_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving leaderboard: {e}", file=sys.stderr)

class CyberEscapeHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/leaderboard":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = load_leaderboard()
            self.wfile.write(json.dumps(data).encode("utf-8"))
        elif parsed.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            status = {
                "server": "CYBER_MAINFRAME_ONLINE",
                "timestamp": datetime.now().isoformat(),
                "node": "ALPHA-7-DECRYPTOR"
            }
            self.wfile.write(json.dumps(status).encode("utf-8"))
        else:
            super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/leaderboard":
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length)
            try:
                payload = json.loads(post_body.decode("utf-8"))
                callsign = str(payload.get("callsign", "ANONYMOUS"))[:16].upper()
                time_str = str(payload.get("time", "99:99.99"))
                seconds = float(payload.get("seconds", 9999.0))
                
                board = load_leaderboard()
                board.append({
                    "callsign": callsign,
                    "time": time_str,
                    "seconds": seconds,
                    "date": datetime.now().strftime("%Y-%m-%d %H:%M")
                })
                # Sort by fastest time
                board.sort(key=lambda x: x.get("seconds", 9999))
                board = board[:10]  # keep top 10
                save_leaderboard(board)

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "leaderboard": board}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        # Clean terminal logging
        sys.stdout.write(f"[{datetime.now().strftime('%H:%M:%S')}] MAINFRAME_IO: {format % args}\n")
        sys.stdout.flush()

if __name__ == "__main__":
    # Allow port reuse immediately
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CyberEscapeHandler) as httpd:
        print("=" * 60)
        print(f" CYBER//BREACH MAINFRAME ESCAPE ROOM ACTIVE")
        print(f" Terminal URL: http://localhost:{PORT}")
        print(f" Security Level: MAXIMUM ENCRYPTION")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down Mainframe link...")
