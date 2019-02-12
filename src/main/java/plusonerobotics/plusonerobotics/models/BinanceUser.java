package plusonerobotics.plusonerobotics.models;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiRestClient;

public class BinanceUser {

    public static BinanceApiRestClient getUser() {
        return BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI",
                "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF").newRestClient();
    }

}
