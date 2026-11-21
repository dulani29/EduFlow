import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

// Only the first screens are loaded up front. Everything else loads when opened.
import LandingScreen from '../screens/onboarding/LandingScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

const lazy = (loader) => {
  let Loaded = null;
  function LazyScreen(props) {
    const [, setTick] = useState(0);
    useEffect(() => {
      let alive = true;
      if (!Loaded) {
        loader()
          .then((mod) => {
            Loaded = mod.default;
            if (alive) setTick((n) => n + 1);
          })
          .catch((error) => {
            console.error('Failed to load screen', error);
          });
      }
      return () => {
        alive = false;
      };
    }, []);

    if (!Loaded) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    const Comp = Loaded;
    return <Comp {...props} />;
  }
  return LazyScreen;
};

const TabNavigator = lazy(() => import('./TabNavigator'));
const QuizListScreen = lazy(() => import('../screens/assessments/QuizListScreen'));
const QuizScreen = lazy(() => import('../screens/assessments/QuizScreen'));
const QuizResultScreen = lazy(() => import('../screens/assessments/QuizResultScreen'));
const AssignmentListScreen = lazy(() => import('../screens/assessments/AssignmentListScreen'));
const AssignmentDetailScreen = lazy(() => import('../screens/assessments/AssignmentDetailScreen'));
const SubmitAssignmentScreen = lazy(() => import('../screens/assessments/SubmitAssignmentScreen'));
const ProgressScreen = lazy(() => import('../screens/analytics/ProgressScreen'));
const CertificateScreen = lazy(() => import('../screens/analytics/CertificateScreen'));
const AnalyticsDashboardScreen = lazy(() => import('../screens/analytics/AnalyticsDashboardScreen'));
const CompletedCoursesScreen = lazy(() => import('../screens/analytics/CompletedCoursesScreen'));
const DiscussionBoardScreen = lazy(() => import('../screens/discussion/DiscussionBoardScreen'));
const DiscussionDetailScreen = lazy(() => import('../screens/discussion/DiscussionDetailScreen'));
const AddDiscussionScreen = lazy(() => import('../screens/discussion/AddDiscussionScreen'));
const EditDiscussionScreen = lazy(() => import('../screens/discussion/EditDiscussionScreen'));
const FeedbackScreen = lazy(() => import('../screens/discussion/FeedbackScreen'));
const ReportScreen = lazy(() => import('../screens/discussion/ReportScreen'));
const NotificationScreen = lazy(() => import('../screens/notifications/NotificationScreen'));
const AnnouncementScreen = lazy(() => import('../screens/notifications/AnnouncementScreen'));
const StreakScreen = lazy(() => import('../screens/notifications/StreakScreen'));
const BadgeScreen = lazy(() => import('../screens/notifications/BadgeScreen'));
const GamificationDashboardScreen = lazy(() => import('../screens/gamification/GamificationDashboardScreen'));
const GamificationLeaderboardScreen = lazy(() => import('../screens/gamification/LeaderboardScreen'));
const GamificationBadgesScreen = lazy(() => import('../screens/gamification/BadgesScreen'));
const CourseDetailScreen = lazy(() => import('../screens/courses/CourseDetailScreen'));
const LessonScreen = lazy(() => import('../screens/courses/LessonScreen'));
const EditProfileScreen = lazy(() => import('../screens/users/EditProfileScreen'));
const InstructorListScreen = lazy(() => import('../screens/users/InstructorListScreen'));
const SettingsScreen = lazy(() => import('../screens/users/SettingsScreen'));
const HelpSupportScreen = lazy(() => import('../screens/users/HelpSupportScreen'));
const ModuleDashboardScreen = lazy(() => import('../screens/dashboard/ModuleDashboardScreen'));
const InstructorCourseDetailScreen = lazy(() => import('../screens/instructor/InstructorCourseDetailScreen'));
const InstructorSubmissionsScreen = lazy(() => import('../screens/instructor/InstructorSubmissionsScreen'));
const ManageLessonsScreen = lazy(() => import('../screens/instructor/ManageLessonsScreen'));
const AddLessonScreen = lazy(() => import('../screens/instructor/AddLessonScreen'));
const EditLessonScreen = lazy(() => import('../screens/instructor/EditLessonScreen'));
const GradeSubmissionsScreen = lazy(() => import('../screens/instructor/GradeSubmissionsScreen'));
const CreateCourseScreen = lazy(() => import('../screens/instructor/CreateCourseScreen'));
const EditCourseScreen = lazy(() => import('../screens/instructor/EditCourseScreen'));
const CreateLessonScreen = lazy(() => import('../screens/instructor/CreateLessonScreen'));
const CreateQuizScreen = lazy(() => import('../screens/instructor/CreateQuizScreen'));
const AddQuizScreen = lazy(() => import('../screens/instructor/AddQuizScreen'));
const CreateAssignmentScreen = lazy(() => import('../screens/instructor/CreateAssignmentScreen'));
const AddAssignmentScreen = lazy(() => import('../screens/instructor/AddAssignmentScreen'));
const CreateAnnouncementScreen = lazy(() => import('../screens/instructor/CreateAnnouncementScreen'));
const ManageQuizzesScreen = lazy(() => import('../screens/instructor/ManageQuizzesScreen'));
const ChangePasswordScreen = lazy(() => import('../screens/instructor/ChangePasswordScreen'));
const CourseStudentsScreen = lazy(() => import('../screens/instructor/CourseStudentsScreen'));
const AssignmentTemplatesScreen = lazy(() => import('../screens/instructor/AssignmentTemplatesScreen'));
const NotificationPreferencesScreen = lazy(() => import('../screens/instructor/NotificationPreferencesScreen'));
const InactiveStudentsScreen = lazy(() => import('../screens/instructor/InactiveStudentsScreen'));
const BatchEnrollmentScreen = lazy(() => import('../screens/instructor/BatchEnrollmentScreen'));
const MessagesListScreen = lazy(() => import('../screens/instructor/MessagesListScreen'));
const DirectMessageScreen = lazy(() => import('../screens/instructor/DirectMessageScreen'));
const StudentListForMessageScreen = lazy(() => import('../screens/instructor/StudentListForMessageScreen'));
const CertificateManagementScreen = lazy(() => import('../screens/instructor/CertificateManagementScreen'));
const DiscussionModerationScreen = lazy(() => import('../screens/instructor/DiscussionModerationScreen'));
const InstructorProfileScreen = lazy(() => import('../screens/instructor/InstructorProfileScreen'));
const LiveClassSchedulerScreen = lazy(() => import('../screens/instructor/LiveClassSchedulerScreen'));
const StudentPerformanceReportScreen = lazy(() => import('../screens/instructor/StudentPerformanceReportScreen'));
const PeerReviewManagementScreen = lazy(() => import('../screens/instructor/PeerReviewManagementScreen'));
const ExportCourseDataScreen = lazy(() => import('../screens/instructor/ExportCourseDataScreen'));
const AssessmentManagementScreen = lazy(() => import('../screens/instructor/AssessmentManagementScreen'));
const StudyGroupsScreen = lazy(() => import('../screens/student/StudyGroupsScreen'));
const StudentLiveClassesScreen = lazy(() => import('../screens/student/StudentLiveClassesScreen'));
const ForumScreen = lazy(() => import('../screens/student/ForumScreen'));
const LeaderboardScreen = lazy(() => import('../screens/student/LeaderboardScreen'));
const FlashcardsScreen = lazy(() => import('../screens/student/FlashcardsScreen'));
const WellnessTrackerScreen = lazy(() => import('../screens/student/WellnessTrackerScreen'));
const GoalSettingScreen = lazy(() => import('../screens/student/GoalSettingScreen'));
const DataExportScreen = lazy(() => import('../screens/settings/DataExportScreen'));
const AuditLogsScreen = lazy(() => import('../screens/admin/AuditLogsScreen'));
const AdminUserDetailScreen = lazy(() => import('../screens/admin/AdminUserDetailScreen'));
const AdminInstructorsScreen = lazy(() => import('../screens/admin/AdminInstructorsScreen'));
const AdminReportsScreen = lazy(() => import('../screens/admin/AdminReportsScreen'));
const AdminAnnouncementsScreen = lazy(() => import('../screens/admin/AdminAnnouncementsScreen'));
const AdminNotificationsScreen = lazy(() => import('../screens/admin/AdminNotificationsScreen'));
const AdminLogsScreen = lazy(() => import('../screens/admin/AdminLogsScreen'));
const AdminDiscussionsScreen = lazy(() => import('../screens/admin/AdminDiscussionsScreen'));
const AdminFeedbackScreen = lazy(() => import('../screens/admin/AdminFeedbackScreen'));
const AdminAnalyticsScreen = lazy(() => import('../screens/admin/AdminAnalyticsScreen'));

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      setShowOnboarding(completed !== 'true');
    } catch (error) {
      console.error('Error checking onboarding:', error);
      setShowOnboarding(false);
    }
  };

  if (loading || showOnboarding === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showOnboarding && !isAuthenticated ? (
          <>
            <Stack.Screen 
              name="Landing" 
              component={LandingScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen} 
              options={{ headerShown: false }}
            />
          </>
        ) : null}
        {isAuthenticated ? (
          <>
            <Stack.Screen 
              name="Main" 
              component={TabNavigator} 
              options={{ headerShown: false }}
            />
            {/* Dashboard Screens */}
            <Stack.Screen 
              name="ModuleDashboard" 
              component={ModuleDashboardScreen}
              options={{ headerShown: false }}
            />
            {/* Course Screens */}
            <Stack.Screen 
              name="CourseDetail" 
              component={CourseDetailScreen}
              options={{ title: 'Course Details' }}
            />
            <Stack.Screen 
              name="Lesson" 
              component={LessonScreen}
              options={{ title: 'Lesson' }}
            />
            {/* User Screens */}
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen}
              options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen 
              name="InstructorList" 
              component={InstructorListScreen}
              options={{ title: 'Instructors' }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="HelpSupport" 
              component={HelpSupportScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="ChangePassword" 
              component={ChangePasswordScreen}
              options={{ title: 'Change Password' }}
            />
            {/* Assessment Screens */}
            <Stack.Screen 
              name="QuizList" 
              component={QuizListScreen}
              options={{ title: 'Quizzes' }}
            />
            <Stack.Screen 
              name="Quiz" 
              component={QuizScreen}
              options={{ title: 'Take Quiz', headerLeft: null }}
            />
            <Stack.Screen 
              name="QuizResult" 
              component={QuizResultScreen}
              options={{ title: 'Quiz Result', headerLeft: null }}
            />
            <Stack.Screen 
              name="AssignmentList" 
              component={AssignmentListScreen}
              options={{ title: 'Assignments' }}
            />
            <Stack.Screen 
              name="AssignmentDetail" 
              component={AssignmentDetailScreen}
              options={{ title: 'Assignment Details' }}
            />
            <Stack.Screen 
              name="SubmitAssignment" 
              component={SubmitAssignmentScreen}
              options={{ title: 'Submit Assignment' }}
            />
            {/* Analytics Screens */}
            <Stack.Screen 
              name="Progress" 
              component={ProgressScreen}
              options={{ title: 'Course Progress' }}
            />
            <Stack.Screen 
              name="CompletedCourses" 
              component={CompletedCoursesScreen}
              options={{ title: 'Completed Courses' }}
            />
            <Stack.Screen 
              name="Certificate" 
              component={CertificateScreen}
              options={{ title: 'My Certificates' }}
            />
            <Stack.Screen 
              name="Analytics" 
              component={AnalyticsDashboardScreen}
              options={{ title: 'Analytics Dashboard' }}
            />
            
            {/* Gamification Screens */}
            <Stack.Screen 
              name="GamificationDashboard" 
              component={GamificationDashboardScreen}
              options={{ title: 'Gamification' }}
            />
            <Stack.Screen 
              name="GamificationLeaderboard" 
              component={GamificationLeaderboardScreen}
              options={{ title: 'Leaderboard' }}
            />
            <Stack.Screen 
              name="GamificationBadges" 
              component={GamificationBadgesScreen}
              options={{ title: 'Badges' }}
            />
            
            {/* Discussion Screens */}
            <Stack.Screen 
              name="DiscussionBoard" 
              component={DiscussionBoardScreen}
              options={{ title: 'Discussions' }}
            />
            <Stack.Screen 
              name="DiscussionDetail" 
              component={DiscussionDetailScreen}
              options={{ title: 'Discussion' }}
            />
            <Stack.Screen 
              name="AddDiscussion" 
              component={AddDiscussionScreen}
              options={{ title: 'New Discussion' }}
            />
            <Stack.Screen 
              name="EditDiscussion" 
              component={EditDiscussionScreen}
              options={{ title: 'Edit Discussion' }}
            />
            <Stack.Screen 
              name="Feedback" 
              component={FeedbackScreen}
              options={{ title: 'Course Feedback' }}
            />
            <Stack.Screen 
              name="Report" 
              component={ReportScreen}
              options={{ title: 'Report Content' }}
            />
            {/* Notification Screens */}
            <Stack.Screen 
              name="NotificationList" 
              component={NotificationScreen}
              options={{ title: 'All Notifications' }}
            />
            <Stack.Screen 
              name="Announcements" 
              component={AnnouncementScreen}
              options={{ title: 'Announcements' }}
            />
            <Stack.Screen 
              name="Streak" 
              component={StreakScreen}
              options={{ title: 'Learning Streak' }}
            />
            <Stack.Screen 
              name="Badges" 
              component={BadgeScreen}
              options={{ title: 'Achievement Badges' }}
            />
            <Stack.Screen
              name="ManageLessons"
              component={ManageLessonsScreen}
              options={{ title: 'Manage Lessons' }}
            />
            <Stack.Screen
              name="AddLesson"
              component={AddLessonScreen}
              options={{ title: 'Add Lesson' }}
            />
            <Stack.Screen
              name="EditLesson"
              component={EditLessonScreen}
              options={{ title: 'Edit Lesson' }}
            />
            {/* Instructor Screens */}
            <Stack.Screen
              name="InstructorCourseDetail"
              component={InstructorCourseDetailScreen}
              options={{ title: 'Manage Course' }}
            />
            <Stack.Screen
              name="InstructorSubmissions"
              component={GradeSubmissionsScreen}
              options={{ title: 'Submissions' }}
            />
            <Stack.Screen
              name="InstructorStudents"
              component={InstructorSubmissionsScreen}
              options={{ title: 'Students' }}
            />
            <Stack.Screen
              name="InstructorDiscussions"
              component={DiscussionBoardScreen}
              options={{ title: 'Discussions' }}
            />
            <Stack.Screen
              name="CreateCourse"
              component={CreateCourseScreen}
              options={{ title: 'Create Course' }}
            />
            <Stack.Screen
              name="EditCourse"
              component={EditCourseScreen}
              options={{ title: 'Edit Course' }}
            />
            <Stack.Screen
              name="CreateLesson"
              component={CreateLessonScreen}
              options={{ title: 'Add Lesson' }}
            />
            <Stack.Screen
              name="CreateQuiz"
              component={CreateQuizScreen}
              options={{ title: 'Create Quiz' }}
            />
            <Stack.Screen
              name="AddQuiz"
              component={AddQuizScreen}
              options={{ title: 'Create Quiz' }}
            />
            <Stack.Screen
              name="CreateAssignment"
              component={CreateAssignmentScreen}
              options={{ title: 'Create Assignment' }}
            />
            <Stack.Screen
              name="AddAssignment"
              component={AddAssignmentScreen}
              options={{ title: 'Create Assignment' }}
            />
            <Stack.Screen
              name="CreateAnnouncement"
              component={CreateAnnouncementScreen}
              options={{ title: 'Create Announcement' }}
            />
            <Stack.Screen
              name="ManageQuizzes"
              component={ManageQuizzesScreen}
              options={{ title: 'Manage Quizzes' }}
            />
            <Stack.Screen
              name="ManageAssignments"
              component={InstructorCourseDetailScreen}
              options={{ title: 'Manage Assignments' }}
            />
            <Stack.Screen
              name="CourseStudents"
              component={CourseStudentsScreen}
              options={{ title: 'Enrolled Students' }}
            />
            <Stack.Screen
              name="AssignmentTemplates"
              component={AssignmentTemplatesScreen}
              options={{ title: 'Assignment Templates' }}
            />
            <Stack.Screen
              name="NotificationPreferences"
              component={NotificationPreferencesScreen}
              options={{ title: 'Notification Settings' }}
            />
            <Stack.Screen
              name="InactiveStudents"
              component={InactiveStudentsScreen}
              options={{ title: 'Inactive Students' }}
            />
            <Stack.Screen
              name="BatchEnrollment"
              component={BatchEnrollmentScreen}
              options={{ title: 'Batch Enrollment' }}
            />
            <Stack.Screen
              name="MessagesList"
              component={MessagesListScreen}
              options={{ title: 'Messages' }}
            />
            <Stack.Screen
              name="DirectMessage"
              component={DirectMessageScreen}
              options={{ title: 'Chat' }}
            />
            <Stack.Screen
              name="StudentListForMessage"
              component={StudentListForMessageScreen}
              options={{ title: 'Select Student' }}
            />
            <Stack.Screen
              name="CertificateManagement"
              component={CertificateManagementScreen}
              options={{ title: 'Certificates' }}
            />
            <Stack.Screen
              name="DiscussionModeration"
              component={DiscussionModerationScreen}
              options={{ title: 'Discussion Moderation' }}
            />
            <Stack.Screen
              name="InstructorProfile"
              component={InstructorProfileScreen}
              options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen
              name="LiveClassScheduler"
              component={LiveClassSchedulerScreen}
              options={{ title: 'Live Classes' }}
            />
            <Stack.Screen
              name="StudentPerformanceReport"
              component={StudentPerformanceReportScreen}
              options={{ title: 'Performance Report' }}
            />
            <Stack.Screen
              name="PeerReviewManagement"
              component={PeerReviewManagementScreen}
              options={{ title: 'Peer Reviews' }}
            />
            <Stack.Screen
              name="ExportCourseData"
              component={ExportCourseDataScreen}
              options={{ title: 'Export Course Data' }}
            />
            <Stack.Screen
              name="AssessmentManagement"
              component={AssessmentManagementScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StudyGroups"
              component={StudyGroupsScreen}
              options={{ title: 'Study Groups' }}
            />
            <Stack.Screen
              name="StudentLiveClasses"
              component={StudentLiveClassesScreen}
              options={{ title: 'Live Classes' }}
            />
            <Stack.Screen
              name="Forum"
              component={ForumScreen}
              options={{ title: 'Forum' }}
            />
            <Stack.Screen
              name="Leaderboard"
              component={LeaderboardScreen}
              options={{ title: 'Leaderboard' }}
            />
            <Stack.Screen
              name="Flashcards"
              component={FlashcardsScreen}
              options={{ title: 'Flashcards' }}
            />
            <Stack.Screen
              name="WellnessTracker"
              component={WellnessTrackerScreen}
              options={{ title: 'Wellness Tracker' }}
            />
            <Stack.Screen
              name="GoalSetting"
              component={GoalSettingScreen}
              options={{ title: 'Goal Setting' }}
            />
            {/* Settings Screens */}
            <Stack.Screen
              name="DataExport"
              component={DataExportScreen}
              options={{ title: 'Data Export' }}
            />
            {/* Admin Screens */}
            <Stack.Screen
              name="AuditLogs"
              component={AuditLogsScreen}
              options={{ title: 'Audit Logs' }}
            />
            <Stack.Screen
              name="AdminUserDetail"
              component={AdminUserDetailScreen}
              options={{ title: 'User Details' }}
            />
            <Stack.Screen
              name="AdminInstructors"
              component={AdminInstructorsScreen}
              options={{ title: 'Instructors' }}
            />
            <Stack.Screen
              name="AdminReports"
              component={AdminReportsScreen}
              options={{ title: 'Content Reports' }}
            />
            <Stack.Screen
              name="AdminAnnouncements"
              component={AdminAnnouncementsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdminNotifications"
              component={AdminNotificationsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdminLogs"
              component={AdminLogsScreen}
              options={{ title: 'Admin Logs' }}
            />
            <Stack.Screen
              name="AdminDiscussions"
              component={AdminDiscussionsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdminFeedback"
              component={AdminFeedbackScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdminAnalytics"
              component={AdminAnalyticsScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});

export default AppNavigator;
