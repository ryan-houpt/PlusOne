package plusonerobotics.plusonerobotics.models;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiRestClient;
import com.binance.api.client.domain.account.Account;
import com.binance.api.client.domain.market.BookTicker;
import com.binance.api.client.domain.market.TickerPrice;
import com.binance.api.client.domain.market.TickerStatistics;
import org.apache.commons.lang3.StringUtils;

import java.util.List;


public class binance {




    public static void main(String[] args) {

       BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI", "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF");
       BinanceApiRestClient client = factory.newRestClient();


    }

}
