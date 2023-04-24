
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import NavBarContainer from '../../NavBar';
import EditProfileScreen from "./EditProfileScreen";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { StorageError } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { AuthProvider, useAuthValue } from '../../AuthContext';




const ProfileScreen = () => {
  const navigation = useNavigation();




  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    pronouns: "He/his/him",
    userType: "",
    school: "Lousiana State University",
    subject1: "Astronomy",
    subject2: "Calculus",
    subject3: "Computer Science",
    subject4: "English",
    subject5: "Geology",
  });

  const profilePicture = require('../assets/icons/profileAvatar.png');


  const { currentUser } = useAuthValue();
  const user = auth.currentUser;

  useEffect(() => {
    const getUserProfile = async () => {
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      setUserProfile(docSnap.data())
    };
    getUserProfile();
  }, []);




  const handleUpdateProfile = (updatedUserProfile) => {
    setUserProfile(updatedUserProfile);
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen', { userProfile, onUpdateProfile: handleUpdateProfile })
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title]}>My Profile</Text>

        <View style={styles.profileContainer}>
          <View style={styles.pictureContainer}>
            <Image style={styles.profilePic} source={profilePicture} />
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileInfo}>{userProfile.firstName} {userProfile.lastName}</Text>
            <Text style={styles.profileInfo}>{userProfile.pronouns}</Text>
              <Text style={styles.profileInfo}>{currentUser.email}</Text>
              <Text style={styles.userType}>{currentUser.userType}</Text>
            
            {/* <Text style={styles.school}>{userProfile.school}</Text> */}
          </View>
        </View>

        <Text style={styles.subtitle}>My Subjects:</Text>
        <View style={styles.subjectsContainer}>
          <Text style={styles.subjects}>{userProfile.subject1}</Text>
          <Text style={styles.subjects}>{userProfile.subject2}</Text>
          <Text style={styles.subjects}>{userProfile.subject3}</Text>
          <Text style={styles.subjects}>{userProfile.subject4}</Text>
          <Text style={styles.subjects}>{userProfile.subject5}</Text>
        </View>
        <Pressable
          style={[styles.button, styles.editProfileButton]}
          onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
      <NavBarContainer />
    </View>
  );
};

const blue = '#182640';
const tan = '#FAE8CD';

const styles = StyleSheet.create({
  button: {
    width: 175,
    height: 50,
    marginTop: 50,    //subject to change if styling changes are made
    marginBottom: 10,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 4.5,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: blue,
  },
  buttonText: {
    color: tan,
    fontSize: 20,
    fontFamily: 'SF',
  },
  editProfileButton: {
    backgroundColor: blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 4,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#182640',
    paddingTop: 120,
  },
  title: {
    fontSize: 25,
    marginTop: -75,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
    marginTop: 50,
  },
  profileInfo: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'SF',
    fontSize: 17,
  },
  userType: {
    color: tan,
    fontFamily: 'SF',
    fontSize: 17,
    marginBottom: 5,
  },
  school: {
    color: tan,
    fontFamily: 'SF',
    fontSize: 17,
  },
  subjects: {
    color: tan,
    fontFamily: 'SF',
    fontSize: 17,
    marginBottom: 15,
  },
  pronouns: {
    color: tan,
    fontFamily: 'SF',
    fontSize: 17,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInfoContainer: {
    marginLeft: 10,
  },
  subjectsContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // couldnt get image imports so temporary placeholder
  profilePic: {
    width: 105,
    height: 105,
    borderRadius: 25,
    marginTop: 8,
  },
  pictureContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },

});

export default ProfileScreen;