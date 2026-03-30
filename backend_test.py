import requests
import sys
import json
from datetime import datetime, date, timedelta

class CasaJuanAPITester:
    def __init__(self, base_url="https://casa-juan-mesa.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_reservation_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else self.api_url
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list) and len(response_data) > 0:
                        print(f"   Response: {len(response_data)} items returned")
                    elif isinstance(response_data, dict):
                        print(f"   Response keys: {list(response_data.keys())}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.text and response.status_code < 500 else {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        success, response = self.run_test(
            "API Root",
            "GET",
            "",
            200
        )
        return success

    def test_get_menu(self):
        """Test getting menu items"""
        success, response = self.run_test(
            "Get Menu",
            "GET",
            "menu",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Menu items found: {len(response)}")
            if len(response) > 0:
                item = response[0]
                required_fields = ['id', 'name', 'description', 'price', 'category']
                missing_fields = [field for field in required_fields if field not in item]
                if missing_fields:
                    print(f"   ⚠️  Missing fields in menu item: {missing_fields}")
                else:
                    print(f"   ✅ Menu item structure is correct")
                    # Check multilingual support
                    if isinstance(item.get('name'), dict):
                        languages = list(item['name'].keys())
                        print(f"   ✅ Multilingual support: {languages}")
        
        return success

    def test_get_time_slots(self):
        """Test getting time slots"""
        success, response = self.run_test(
            "Get Time Slots",
            "GET",
            "time-slots",
            200
        )
        
        if success and isinstance(response, dict):
            if 'lunch' in response and 'dinner' in response:
                print(f"   ✅ Time slots structure correct")
                print(f"   Lunch slots: {len(response['lunch'])}")
                print(f"   Dinner slots: {len(response['dinner'])}")
            else:
                print(f"   ⚠️  Missing lunch or dinner slots")
        
        return success

    def test_create_reservation(self):
        """Test creating a reservation"""
        tomorrow = (date.today() + timedelta(days=1)).strftime('%Y-%m-%d')
        
        reservation_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+34123456789",
            "date": tomorrow,
            "time": "19:00",
            "guests": 2,
            "notes": "Test reservation",
            "language": "es"
        }
        
        success, response = self.run_test(
            "Create Reservation",
            "POST",
            "reservations",
            200,
            data=reservation_data
        )
        
        if success and isinstance(response, dict):
            if 'id' in response:
                self.created_reservation_id = response['id']
                print(f"   ✅ Reservation created with ID: {self.created_reservation_id}")
                
                # Verify all fields are present
                expected_fields = ['id', 'name', 'email', 'phone', 'date', 'time', 'guests', 'status', 'created_at']
                missing_fields = [field for field in expected_fields if field not in response]
                if missing_fields:
                    print(f"   ⚠️  Missing fields in response: {missing_fields}")
                else:
                    print(f"   ✅ All expected fields present")
            else:
                print(f"   ⚠️  No ID in reservation response")
        
        return success

    def test_get_reservations(self):
        """Test getting all reservations"""
        success, response = self.run_test(
            "Get All Reservations",
            "GET",
            "reservations",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} reservations")
            if self.created_reservation_id and len(response) > 0:
                # Check if our created reservation is in the list
                found = any(r.get('id') == self.created_reservation_id for r in response)
                if found:
                    print(f"   ✅ Created reservation found in list")
                else:
                    print(f"   ⚠️  Created reservation not found in list")
        
        return success

    def test_get_specific_reservation(self):
        """Test getting a specific reservation"""
        if not self.created_reservation_id:
            print("   ⚠️  Skipping - no reservation ID available")
            return True
            
        success, response = self.run_test(
            "Get Specific Reservation",
            "GET",
            f"reservations/{self.created_reservation_id}",
            200
        )
        
        if success and isinstance(response, dict):
            if response.get('id') == self.created_reservation_id:
                print(f"   ✅ Correct reservation retrieved")
            else:
                print(f"   ⚠️  Wrong reservation retrieved")
        
        return success

    def test_delete_reservation(self):
        """Test deleting a reservation"""
        if not self.created_reservation_id:
            print("   ⚠️  Skipping - no reservation ID available")
            return True
            
        success, response = self.run_test(
            "Delete Reservation",
            "DELETE",
            f"reservations/{self.created_reservation_id}",
            200
        )
        
        if success:
            print(f"   ✅ Reservation deleted successfully")
            
            # Verify it's actually deleted
            verify_success, _ = self.run_test(
                "Verify Deletion",
                "GET",
                f"reservations/{self.created_reservation_id}",
                404
            )
            if verify_success:
                print(f"   ✅ Deletion verified - reservation not found")
            else:
                print(f"   ⚠️  Deletion not verified - reservation still exists")
        
        return success

    def test_invalid_reservation(self):
        """Test creating reservation with invalid data"""
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "phone": "",
            "date": "invalid-date",
            "time": "25:00",  # Invalid time
            "guests": 0,  # Invalid guest count
            "language": "es"
        }
        
        success, response = self.run_test(
            "Invalid Reservation Data",
            "POST",
            "reservations",
            422,  # Expecting validation error
            data=invalid_data
        )
        
        return success

def main():
    print("🏠 Casa Juan Restaurant API Testing")
    print("=" * 50)
    
    tester = CasaJuanAPITester()
    
    # Run all tests
    tests = [
        tester.test_api_root,
        tester.test_get_menu,
        tester.test_get_time_slots,
        tester.test_create_reservation,
        tester.test_get_reservations,
        tester.test_get_specific_reservation,
        tester.test_delete_reservation,
        tester.test_invalid_reservation
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            tester.tests_run += 1
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())