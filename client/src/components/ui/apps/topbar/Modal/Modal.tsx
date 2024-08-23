import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Modal = () => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>CHT Disaster Updates কি?</AlertDialogTitle>
        <AlertDialogDescription>
          <b>CHT Disaster Updates</b> একটি ওপেন ডাটাবেজ প্লাটফর্ম যা আপনাকে
          পার্বত্য চট্টগ্রামের দুর্যোগকবলিত এলাকা এবং সেসকল এলাকাসমূহে কোন কোন
          সেচ্ছাসেবী সংগঠন কি ধরনের কাজ করছে এবং করেছে তার একটি রেকর্ড রাখে। এই
          প্লাটফর্মের মূল লক্ষ্য যাতে দুর্গত এলাকাসমূহে ত্রাণ এবং অর্থ সহায়তা
          যেন উপদ্রুত এলাকার জনগণ সমবন্টনের সহিত পায়। তাই আপনারা যারা উপদ্রুত
          এলাকাসমূহের খোঁজ নিচ্ছেন এবং সেচ্ছাসেবী সংগঠনসমূহ কোন কোন এলাকায় কি
          সহায়তা দিচ্ছেন সেসকল তথ্য দিয়ে সহায়তা করুন।
          <p>
            এই প্লাটফর্মটি এখনও বেটা ভার্সনে চলছে। এই প্লাটফর্মটি
            <b>
              <i> Indigenous Artists' Unity </i>
            </b>
            এর একটি ক্ষুদ্র প্রয়াস যা প্রতিনিয়ত চলমান থাকবে।
          </p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction className="bg-green-800">
          এগিয়ে চলুন
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default Modal;
