package plusonerobotics.plusonerobotics.models;


import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class Mobile {

    // Find your Account Sid and Auth Token at Mobile.com/console
    public static final String ACCOUNT_SID =
            "ACac2b4d5200d52339abe5d570fdbfcc28";
    public static final String AUTH_TOKEN =
            "1afd3e99cf55ec6173dbf2b3cf7ad0d6";


    public static void sendText(String message) {
        com.twilio.Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message.creator(new PhoneNumber("+12108383684"), // to
                new PhoneNumber("+18302660958"), // from
                message)
                .create();
    }

}
