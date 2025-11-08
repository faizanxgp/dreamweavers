"""
Test script for Authentication and Dream CRUD endpoints
"""
import asyncio
import httpx
from typing import Optional


BASE_URL = "http://localhost:8001/api/v1"
test_user_email = "testuser@example.com"
test_user_password = "testpassword123"
test_user_username = "testuser"


class APITester:
    def __init__(self):
        self.access_token: Optional[str] = None
        self.user_id: Optional[int] = None
        self.dream_id: Optional[int] = None

    def print_response(self, title: str, response: httpx.Response):
        """Print formatted response"""
        print(f"\n{'='*60}")
        print(f"{title}")
        print(f"{'='*60}")
        print(f"Status Code: {response.status_code}")
        try:
            print(f"Response: {response.json()}")
        except:
            print(f"Response: {response.text}")

    async def test_register(self):
        """Test user registration"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BASE_URL}/auth/register",
                json={
                    "email": test_user_email,
                    "username": test_user_username,
                    "password": test_user_password,
                    "full_name": "Test User"
                }
            )
            self.print_response("1. REGISTER USER", response)

            if response.status_code == 201:
                data = response.json()
                self.access_token = data.get("access_token")
                self.user_id = data.get("user", {}).get("id")
                print(f"✓ Registration successful! Token: {self.access_token[:20]}...")
                return True
            return False

    async def test_login(self):
        """Test user login"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BASE_URL}/auth/login",
                json={
                    "email": test_user_email,
                    "password": test_user_password
                }
            )
            self.print_response("2. LOGIN USER", response)

            if response.status_code == 200:
                data = response.json()
                self.access_token = data.get("access_token")
                self.user_id = data.get("user", {}).get("id")
                print(f"✓ Login successful! Token: {self.access_token[:20]}...")
                return True
            return False

    async def test_get_me(self):
        """Test getting current user info"""
        headers = {"Authorization": f"Bearer {self.access_token}"}

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BASE_URL}/auth/me",
                headers=headers
            )
            self.print_response("3. GET CURRENT USER", response)

            if response.status_code == 200:
                print("✓ Successfully retrieved user info!")
                return True
            return False

    async def test_create_dream(self):
        """Test creating a dream"""
        headers = {"Authorization": f"Bearer {self.access_token}"}

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BASE_URL}/dreams/",
                headers=headers,
                json={
                    "title": "Flying Over Mountains",
                    "description": "I was flying over beautiful mountains with snow-capped peaks. The sky was bright blue and I felt free.",
                    "dream_type": "regular",
                    "privacy": "private",
                    "emotions": ["joy", "freedom", "peace"],
                    "symbols": ["mountains", "flying", "sky"],
                    "colors": ["blue", "white"],
                    "dream_date": "2025-11-08",
                    "time_of_day": "morning",
                    "tags": ["flying", "nature", "positive"]
                }
            )
            self.print_response("4. CREATE DREAM", response)

            if response.status_code == 201:
                data = response.json()
                self.dream_id = data.get("id")
                print(f"✓ Dream created successfully! Dream ID: {self.dream_id}")
                return True
            return False

    async def test_get_dreams(self):
        """Test getting all dreams"""
        headers = {"Authorization": f"Bearer {self.access_token}"}

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BASE_URL}/dreams/?page=1&page_size=10",
                headers=headers
            )
            self.print_response("5. GET ALL DREAMS", response)

            if response.status_code == 200:
                print("✓ Successfully retrieved dreams!")
                return True
            return False

    async def test_get_dream_by_id(self):
        """Test getting a specific dream"""
        headers = {"Authorization": f"Bearer {self.access_token}"}

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{BASE_URL}/dreams/{self.dream_id}",
                headers=headers
            )
            self.print_response("6. GET DREAM BY ID", response)

            if response.status_code == 200:
                print("✓ Successfully retrieved dream!")
                return True
            return False

    async def test_update_dream(self):
        """Test updating a dream"""
        headers = {"Authorization": f"Bearer {self.access_token}"}

        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{BASE_URL}/dreams/{self.dream_id}",
                headers=headers,
                json={
                    "title": "Flying Over Mountains - Updated",
                    "description": "I was flying over beautiful mountains with snow-capped peaks. The sky was bright blue and I felt free. Updated description with more details.",
                    "tags": ["flying", "nature", "positive", "updated"]
                }
            )
            self.print_response("7. UPDATE DREAM", response)

            if response.status_code == 200:
                print("✓ Dream updated successfully!")
                return True
            return False

    async def test_delete_dream(self):
        """Test deleting a dream"""
        headers = {"Authorization": f"Bearer {self.access_token}"}

        async with httpx.AsyncClient() as client:
            response = await client.delete(
                f"{BASE_URL}/dreams/{self.dream_id}",
                headers=headers
            )
            self.print_response("8. DELETE DREAM", response)

            if response.status_code == 204:
                print("✓ Dream deleted successfully!")
                return True
            return False

    async def run_all_tests(self):
        """Run all tests in sequence"""
        print("\n" + "="*60)
        print("STARTING API TESTS")
        print("="*60)

        # Test Authentication
        if not await self.test_register():
            print("\n✗ Registration failed, trying login instead...")
            if not await self.test_login():
                print("\n✗ Login failed! Cannot continue tests.")
                return

        await self.test_get_me()

        # Test Dream CRUD
        await self.test_create_dream()
        await self.test_get_dreams()
        await self.test_get_dream_by_id()
        await self.test_update_dream()
        await self.test_delete_dream()

        print("\n" + "="*60)
        print("ALL TESTS COMPLETED")
        print("="*60 + "\n")


async def main():
    tester = APITester()
    await tester.run_all_tests()


if __name__ == "__main__":
    asyncio.run(main())
